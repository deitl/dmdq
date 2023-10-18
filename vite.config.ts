import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async () => {
  const { default: rehypePrettyCode } = await import("rehype-pretty-code");

  return {
    plugins: [qwikCity({
      mdxPlugins: {
        rehypeSyntaxHighlight: false,
        remarkGfm: true,
        rehypeAutolinkHeadings: true,
      },
      mdx: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "dark-plus",
              onVisitLine(node: any) {
                // Prevent lines from collapsing in `display: grid` mode, and
                // allow empty lines to be copy/pasted
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
              },
              onVisitHighlightedLine(node: any) {
                // Each line node by default has `class="line"`.
                node.properties.className.push("line--highlighted");
              },
              onVisitHighlightedWord(node: any, id: string) {
                // Each word node has no className by default.
                node.properties.className = ["word"];
                if (id) {
                  const backgroundColor = {
                    a: "rgb(196 42 94 / 59%)",
                    b: "rgb(0 103 163 / 56%)",
                    c: "rgb(100 50 255 / 35%)",
                  }[id];

                  const color = {
                    a: "rgb(255 225 225 / 100%)",
                    b: "rgb(175 255 255 / 100%)",
                    c: "rgb(225 200 255 / 100%)",
                  }[id];
                  if (node.properties["data-rehype-pretty-code-wrapper"]) {
                    node.children.forEach((childNode: any) => {
                      childNode.properties.style = ``;
                      childNode.properties.className = "";
                    });
                  }
                  node.properties.style = `background-color: ${backgroundColor}; color: ${color};`;
                }
              },
            },
          ],
        ],
      },
    }), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
