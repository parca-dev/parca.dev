import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import styles from './Quickstart.module.css';
import {usePluginData} from '@docusaurus/useGlobalData';
// import gettingStartedSimple from '!!raw-loader!./gettingStartedSimple.bash';
// import gettingStartedMinikube from '!!raw-loader!./gettingStartedMinikube.bash';

export default function Quickstart() {
    const [mode, setMode] = useState('binary');
    const [binaryMode, setBinaryMode] = useState('server');
    const {versions} = usePluginData('docusaurus-github-releases-plugin');

    const curlInstructions = {
        "server": `# Download the binary specific to your OS and architecture
curl -sL https://github.com/parca-dev/parca/releases/download/${versions.server}/parca_${versions.server.substring(1)}_\`uname -s\`_\`uname -m\`.tar.gz | tar xvfz -
# Get basic configuration
curl -sL https://raw.githubusercontent.com/parca-dev/parca/main/parca.yaml > parca.yaml
# Run Parca and access the Web UI on port 7070
./parca --config=parca.yaml`,
        "agent": `# Download the binary specific to your architecture (only works on Linux)
curl -sL https://github.com/parca-dev/parca-agent/releases/download/${versions.agent}/parca-agent_${versions.agent.substring(1)}_\`uname -s\`_\`uname -m\`.tar.gz | tar xvfz -
# Run Parca Agent and access the Web UI on port 7071 (assumes Parca is running on localhost:7070)
./parca-agent --node=test --remote-store-address=localhost:7070 --remote-store-insecure`
    }[binaryMode]

    const dockerInstructions = {
        "server": `docker run --rm -it ghcr.io/parca-dev/parca:${versions.server} /parca `,
        "agent": `docker run --rm -it --privileged ghcr.io/parca-dev/parca-agent:${versions.agent} /bin/parca-agent --node=docker-test`
    }
    const containerInstructions = `# Run Parca and access the Web UI on port 7070\n${dockerInstructions.server}\n# Run Parca Agent (requires privileged more) and access the Web UI on port 7071 (assumes Parca is running on localhost:7070)\n${dockerInstructions.agent}`

    const kubernetesInstructions = {
        "server": `kubectl apply -f https://github.com/parca-dev/parca/releases/download/${versions.server}/kubernetes-manifest.yaml`,
        "agent": `kubectl apply -f https://github.com/parca-dev/parca-agent/releases/download/${versions.agent}/kubernetes-manifest.yaml`
    }
    const minikubeInstructions = `# Minikube needs to be configured with a real virtual machine driver\nminikube start --driver=virtualbox # kvm2, or qemu2 can be used. Driver needs to be VM-based. \n# Create the namespace (not strictly necessary but prevents a race with the next commands)\nkubectl create namespace parca\n# Use to deploy Parca Server (API and UI)\n${kubernetesInstructions.server}\n# Use to deploy Parca Agent for all nodes\n${kubernetesInstructions.agent}`

    const snippet = (function () {
        switch(mode) {
            case "binary": return curlInstructions;
            case "container": return containerInstructions;
            case "kubernetes": return minikubeInstructions;
        }
    })();
    const link = mode == 'kubernetes' ? '/docs/kubernetes' : '/docs/binary';
    const text = mode == 'kubernetes' ? 'Parca in Kubernetes - Tutorial 5min ⏱️': 'Parca from Binary - Tutorial 5min ⏱️';

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col--12">
                        <div>
                            <button
                                className={`button button--lg button--outline ${styles.buttonGroupButton} ${ mode == 'binary' ? 'button--warning button--active' : 'button--secondary' }`}
                                onClick={() => setMode('binary')}
                            >Binary</button>
                            <button
                                style={{ marginLeft: 10 }}
                                className={`button button--lg button--outline ${styles.buttonGroupButton} ${ mode == 'container' ? 'button--warning button--active' : 'button--secondary' }`}
                                onClick={() => setMode('container')}
                            >Container</button>
                            <button
                                style={{ marginLeft: 10 }}
                                className={`button button--lg button--outline ${styles.buttonGroupButton} ${ mode == 'kubernetes' ? 'button--warning button--active' : 'button--secondary' }`}
                                onClick={() => setMode('kubernetes')}
                            >Kubernetes</button>
                        </div>
                    </div>
                </div>
                {mode == "binary" && (
                    <div className="row" style={{ marginTop: 20 }}>
                    <div className="col col--12">
                        <div>
                            <button
                                className={`button button--lg button--outline ${styles.buttonGroupButton} ${ binaryMode == 'server' ? 'button--warning button--active' : 'button--secondary' }`}
                                onClick={() => setBinaryMode('server')}
                            >Server</button>
                            <button
                                style={{ marginLeft: 10 }}
                                className={`button button--lg button--outline ${styles.buttonGroupButton} ${ binaryMode == 'agent' ? 'button--warning button--active' : 'button--secondary' }`}
                                onClick={() => setBinaryMode('agent')}
                            >Agent</button>
                        </div>
                    </div>
                </div>
                )}
                <br />
                <div style={{ textAlign: 'left', marginTop: 20 }}>
                    <div className="row">
                        <div className="col col--12 ">
                            <CodeBlock className="language-bash">{snippet}</CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className={styles.buttons}>
                <Link
                    className="button button--secondary button--lg"
                    to={link}>
                    {text}
                </Link>
            </div>
        </>
    )
}
