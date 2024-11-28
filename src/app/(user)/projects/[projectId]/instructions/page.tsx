"use client"

import CustomLink from "@/components/CustomLink";
import { Check, ChevronLeft, Copy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const InstructionPage = () => {
  const { projectId } = useParams()
  const widgetUrl = process.env.NEXT_PUBLIC_WIDGET_URL;
  const [isCopied, setIsCopied] = useState(false)

  console.log("Project id = ", projectId);

  if (!projectId) return (<div>Invalid Project ID</div>);
  if (!widgetUrl) return (<div>Missing WIDGET_URL</div>);

  const handleCopy = () => {
    const codeElement = document.querySelector("code");
    if (codeElement) {
      // Get the plain text content of the <code> tag
      const textContent = codeElement.textContent || '';

      // Replace <br /> tags with newline characters (\n)
      const textToCopy = textContent.replace(/\n/g, ' ').replace(/<br\s*\/?>/gi, '\n');

      // Copy the text content to clipboard
      navigator.clipboard.writeText(textToCopy).then(() => {
        console.log("Content copied to clipboard:", textToCopy);
        setIsCopied(true)
      }).catch((err) => {
        console.error("Error copying text: ", err);
      });
    }
  }

  return (
    <div>
      <CustomLink url={`/projects/${projectId}`}>
        <ChevronLeft />Back to project info
      </CustomLink>
      <h1 className="mt-8 mb-4 font-extrabold text-2xl">Start Collecting Feedback</h1>
      <p>Embed the code in your site.</p>
      <div className="w-full bg-blue-900/90 px-5 pt-10 pb-5 mt-4 relative rounded-sm text-slate-100">
        {isCopied && <div className="absolute top-0 left-0 w-full bg-stone-500 font-semibold text-center py-1">Copied</div>}
        <code className="w-full ">
          {`<feedback-widget project-id="${projectId}"></feedback-widget>`}
          <br />
          {`<script src="${widgetUrl}/widget.umd.js"></script>`}
        </code>
        {isCopied ? <Check className="absolute top-1 right-3" /> : <Copy className="absolute top-1 right-3 transition-all duration-300 opacity-60 hover:opacity-100 hover:cursor-pointer" onClick={handleCopy} />}
      </div>
    </div>
  )
}

export default InstructionPage