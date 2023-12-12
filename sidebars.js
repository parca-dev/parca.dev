/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    {
      type: "doc",
      label: "Overview",
      id: "overview",
    },
    {
      type: "doc",
      label: "Quick Start",
      id: "quickstart",
    },
    {
      type: "doc",
      label: "Concepts",
      id: "concepts",
    },
    {
      type: "doc",
      label: "FAQ",
      id: "faq",
    },
    {
      type: "doc",
      label: "Commercial Solutions",
      id: "commercial",
    },
    {
      type: "category",
      label: "Server",
      items: [
        "parca",
        "ingestion",
        "storage",
        "symbolization",
        "debuginfos",
        "debuginfod",
        {
          type: "link",
          label: "gRPC APIs",
          href: "https://buf.build/parca-dev/parca",
        },
        {
          type: "category",
          label: "Operation",
          items: ["observability", "configuration", "resource-usage"],
        },
        {
          type: "category",
          label: "Visualization",
          items: [
            "icicle-graph-anatomy",
            "icicle-graph-understanding",
            "icicle-graph-interpretation",
            "icicle-graph-binary-based-colour-stack",
            "graph-tooltip-details",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Agent",
      items: [
        "parca-agent",
        "parca-agent-design",
        "parca-agent-labelling",
        {
          type: "category",
          label: "Language Support",
          link: { type: "doc", id: "parca-agent-language-support" },
          items: ["java-support"],
        },
        "parca-agent-security",
      ],
    },
    {
      type: "doc",
      label: "Debuginfo CLI",
      id: "debuginfo-cli",
    },
    {
      type: "category",
      label: "Grafana Plugin",
      items: ["grafana-flamegraph-plugin", "grafana-datasource-plugin"],
    },
    {
      type: "doc",
      label: "Governance",
      id: "governance",
    },
    {
      type: "doc",
      label: "Community",
      id: "community",
    },
    {
      type: "doc",
      label: "Resources",
      id: "talks",
    },
    {
      type: "category",
      label: "Tutorial",
      items: [
        {
          type: "category",
          label: "Running Parca",
          items: [
            "binary",
            "parca-snap",
            "agent-binary",
            "systemd",
          ],
        },
        {
          type: "category",
          label: "Deploying Parca",
          items: ["kubernetes", "openshift"],
        },
        "querying-parca",
        "filter-by-function",
        "troubleshooting-parca-agent",
        "exposing-parca-write",
        {
          type: "category",
          label: "Profiling 101",
          items: ["profiling-101", "instrumenting-go"],
        },
      ],
    },
    {
      type: "doc",
      label: "Demo",
      id: "demo",
    },
  ],
};
