import React, { useState } from "react";
import toast from "react-hot-toast";

const Page: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      toast.error("Both question and answer are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      if (res.status === 409) {
        toast.error("This question already exists.");
      } else if (res.ok) {
        toast.success("FAQ has been successfully saved!");
        setQuestion("");
        setAnswer("");
      } else {
        toast.error("Something went wrong while saving.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Add New FAQ</h1>

      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group">
          <label className="label">Question</label>
          <input
            type="text"
            placeholder="Enter your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label">Answer</label>
          <textarea
            placeholder="Enter the answer here"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="textarea"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner" /> Saving...
              </>
            ) : (
              "Save FAQ"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
