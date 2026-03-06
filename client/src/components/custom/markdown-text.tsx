import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export  function MarkdownText({ content }: { content: string }) {
  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
      <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>{content}</Markdown>
    </section>
  );
}
