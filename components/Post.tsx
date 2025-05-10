import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

export type FAQProps = {
  id: string,
  question: string,
  answer: string,
}

const Post: React.FC<{ faq: FAQProps }> = ({ faq }) => {
  const answer = faq.answer ? faq.answer : "Unknown FAQ";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${faq.id}`)}>
      <h2>{faq.question}</h2>
      <small>Is {answer}</small>
   
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
