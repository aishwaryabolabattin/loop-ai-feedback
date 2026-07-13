"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AskLoopPage() {
  // User's current question
  const [question, setQuestion] = useState("");

  // AI-generated grounded answer
  const [answer, setAnswer] = useState("");

  // Feedback records used as sources
  const [citations, setCitations] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Submit the question to the Ask LOOP API
  async function handleAskLoop(event) {
    event.preventDefault();

    const cleanedQuestion = question.trim();

    if (!cleanedQuestion) {
      setError("Please enter a question.");
      setAnswer("");
      setCitations([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnswer("");
      setCitations([]);

      const response = await fetch("/api/ask-loop", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: cleanedQuestion,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Ask LOOP could not answer the question.",
        );
      }

      setAnswer(result.answer || "");

      setCitations(Array.isArray(result.citations) ? result.citations : []);
    } catch (requestError) {
      console.error("Ask LOOP request error:", requestError);

      setError(
        requestError.message ||
          "Something went wrong while generating the answer.",
      );
    } finally {
      setLoading(false);
    }
  }

  // Put an example question into the input box
  function useExampleQuestion(exampleQuestion) {
    setQuestion(exampleQuestion);
    setError("");
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F3F4F6",
      }}
    >
      {/* Dashboard Sidebar */}

      <Sidebar />

      {/* Right-side dashboard content */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "35px",
            background: "#F3F4F6",
          }}
        >
          {/* Page Heading */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "32px",
              }}
            >
              🤖 Ask LOOP
            </h1>

            <p
              style={{
                marginTop: "10px",
                marginBottom: 0,
                color: "#6B7280",
                fontSize: "16px",
              }}
            >
              Ask questions about customer feedback and receive grounded answers
              supported by cited feedback records.
            </p>
          </div>

          {/* Question Card */}

          <section style={questionCard}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "22px",
              }}
            >
              <div style={aiIcon}>AI</div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#111827",
                    fontSize: "22px",
                  }}
                >
                  What would you like to know?
                </h2>

                <p
                  style={{
                    marginTop: "6px",
                    marginBottom: 0,
                    color: "#6B7280",
                  }}
                >
                  Ask about themes, customer complaints, positive feedback,
                  support issues, or emerging problems.
                </p>
              </div>
            </div>

            <form onSubmit={handleAskLoop}>
              <textarea
                value={question}
                onChange={(event) => {
                  setQuestion(event.target.value);
                  setError("");
                }}
                placeholder="Example: What are the main customer complaints?"
                rows={5}
                maxLength={500}
                disabled={loading}
                style={questionInput}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#9CA3AF",
                    fontSize: "13px",
                  }}
                >
                  {question.length}/500 characters
                </span>

                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  style={{
                    ...askButton,

                    opacity: loading || !question.trim() ? 0.6 : 1,

                    cursor:
                      loading || !question.trim() ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "⏳ Analyzing Feedback..." : "✨ Ask LOOP"}
                </button>
              </div>
            </form>

            {/* Example Questions */}

            <div
              style={{
                marginTop: "28px",
              }}
            >
              <p
                style={{
                  marginBottom: "12px",
                  color: "#374151",
                  fontWeight: "700",
                }}
              >
                Try an example:
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {exampleQuestions.map((exampleQuestion) => (
                  <button
                    key={exampleQuestion}
                    type="button"
                    disabled={loading}
                    onClick={() => useExampleQuestion(exampleQuestion)}
                    style={exampleButton}
                  >
                    {exampleQuestion}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Error Message */}

          {error && (
            <div style={errorCard}>
              <strong>Unable to complete the request</strong>

              <p
                style={{
                  marginTop: "7px",
                  marginBottom: 0,
                }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Loading Card */}

          {loading && (
            <section style={loadingCard}>
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "15px",
                }}
              >
                🔎
              </div>

              <h3
                style={{
                  margin: 0,
                  color: "#111827",
                }}
              >
                Searching customer feedback...
              </h3>

              <p
                style={{
                  color: "#6B7280",
                  marginBottom: 0,
                }}
              >
                Ask LOOP is finding relevant feedback and preparing a grounded
                answer.
              </p>
            </section>
          )}

          {/* Grounded Answer */}

          {!loading && answer && (
            <section style={answerCard}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "22px",
                }}
              >
                <div style={answerIcon}>🤖</div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#111827",
                    }}
                  >
                    Ask LOOP Answer
                  </h2>

                  <p
                    style={{
                      marginTop: "5px",
                      marginBottom: 0,
                      color: "#6B7280",
                      fontSize: "14px",
                    }}
                  >
                    Grounded in relevant customer feedback
                  </p>
                </div>
              </div>

              <div style={answerText}>{answer}</div>

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "18px",
                  borderTop: "1px solid #E5E7EB",
                  color: "#6B7280",
                  fontSize: "14px",
                }}
              >
                📚 {citations.length} feedback{" "}
                {citations.length === 1 ? "source" : "sources"} used
              </div>
            </section>
          )}

          {/* Citation Cards */}

          {!loading && citations.length > 0 && (
            <section
              style={{
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  marginBottom: "18px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "#111827",
                  }}
                >
                  📚 Cited Feedback
                </h2>

                <p
                  style={{
                    marginTop: "7px",
                    marginBottom: 0,
                    color: "#6B7280",
                  }}
                >
                  These feedback records support the answer above.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                }}
              >
                {citations.map((citation) => (
                  <article
                    key={`${citation.id}-${citation.citationNumber}`}
                    style={citationCard}
                  >
                    {/* Citation Heading */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "15px",
                        marginBottom: "18px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div style={citationNumber}>
                          [{citation.citationNumber}]
                        </div>

                        <div>
                          <div
                            style={{
                              color: "#111827",
                              fontWeight: "800",
                            }}
                          >
                            Feedback #{citation.id}
                          </div>

                          <small
                            style={{
                              color: "#6B7280",
                            }}
                          >
                            Supporting source
                          </small>
                        </div>
                      </div>

                      <div style={similarityBadge}>
                        {Math.round((citation.similarity || 0) * 100)}% match
                      </div>
                    </div>

                    {/* Feedback Message */}

                    <div
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        background: "#F8FAFC",
                        color: "#374151",
                        lineHeight: "1.7",
                        marginBottom: "18px",
                      }}
                    >
                      “{citation.message}”
                    </div>

                    {/* Citation Information */}

                    <div
                      style={{
                        display: "flex",
                        gap: "9px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={themeBadge}>
                        🏷️ {citation.theme || "General"}
                      </span>

                      <span style={getSentimentStyle(citation.sentiment)}>
                        {getSentimentIcon(citation.sentiment)}{" "}
                        {citation.sentiment || "UNKNOWN"}
                      </span>

                      <span style={informationBadge}>
                        📢 {citation.channel || "Unknown"}
                      </span>

                      <span style={informationBadge}>
                        📌 {citation.status || "Unknown"}
                      </span>
                    </div>

                    {/* Summary */}

                    {citation.summary && (
                      <div
                        style={{
                          marginTop: "18px",
                          paddingTop: "16px",
                          borderTop: "1px solid #E5E7EB",
                        }}
                      >
                        <strong
                          style={{
                            color: "#374151",
                            fontSize: "14px",
                          }}
                        >
                          Summary
                        </strong>

                        <p
                          style={{
                            marginTop: "7px",
                            marginBottom: 0,
                            color: "#6B7280",
                            lineHeight: "1.6",
                          }}
                        >
                          {citation.summary}
                        </p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

// ==================================
// Example questions
// ==================================

const exampleQuestions = [
  "What are the main customer complaints?",

  "What delivery problems are customers facing?",

  "What positive feedback have customers provided?",

  "Which customer issues need urgent attention?",
];

// ==================================
// Styles
// ==================================

const questionCard = {
  padding: "30px",
  borderRadius: "20px",
  background: "#FFFFFF",
  boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
};

const aiIcon = {
  width: "52px",
  height: "52px",
  borderRadius: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  background: "#4F46E5",
  color: "#FFFFFF",
  fontWeight: "800",
};

const questionInput = {
  width: "100%",
  minHeight: "130px",
  padding: "18px",
  border: "1px solid #D1D5DB",
  borderRadius: "14px",
  background: "#FFFFFF",
  color: "#111827",
  fontSize: "16px",
  lineHeight: "1.6",
  resize: "vertical",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const askButton = {
  padding: "14px 24px",
  border: "none",
  borderRadius: "12px",
  background: "#4F46E5",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: "800",
};

const exampleButton = {
  padding: "10px 14px",
  border: "1px solid #C7D2FE",
  borderRadius: "30px",
  background: "#EEF2FF",
  color: "#4338CA",
  cursor: "pointer",
  fontWeight: "600",
};

const errorCard = {
  marginTop: "25px",
  padding: "20px",
  border: "1px solid #FECACA",
  borderRadius: "14px",
  background: "#FEF2F2",
  color: "#B91C1C",
};

const loadingCard = {
  marginTop: "30px",
  padding: "45px",
  borderRadius: "20px",
  background: "#FFFFFF",
  boxShadow: "0 12px 35px rgba(0,0,0,0.07)",
  textAlign: "center",
};

const answerCard = {
  marginTop: "30px",
  padding: "30px",
  borderRadius: "20px",
  border: "1px solid #C7D2FE",
  background: "#FFFFFF",
  boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
};

const answerIcon = {
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  background: "#EEF2FF",
  fontSize: "23px",
};

const answerText = {
  padding: "22px",
  borderRadius: "14px",
  background: "#F8FAFC",
  color: "#1F2937",
  fontSize: "16px",
  lineHeight: "1.8",
  whiteSpace: "pre-wrap",
};

const citationCard = {
  padding: "24px",
  borderRadius: "18px",
  border: "1px solid #E5E7EB",
  background: "#FFFFFF",
  boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
};

const citationNumber = {
  width: "45px",
  height: "45px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#4F46E5",
  color: "#FFFFFF",
  fontWeight: "800",
};

const similarityBadge = {
  padding: "8px 11px",
  borderRadius: "20px",
  background: "#DCFCE7",
  color: "#166534",
  fontSize: "12px",
  fontWeight: "800",
  whiteSpace: "nowrap",
};

const themeBadge = {
  padding: "7px 10px",
  borderRadius: "20px",
  background: "#EEF2FF",
  color: "#4338CA",
  fontSize: "12px",
  fontWeight: "700",
};

const informationBadge = {
  padding: "7px 10px",
  borderRadius: "20px",
  background: "#F3F4F6",
  color: "#4B5563",
  fontSize: "12px",
  fontWeight: "700",
};

// ==================================
// Sentiment helpers
// ==================================

function getSentimentIcon(sentiment) {
  const normalized = sentiment?.toUpperCase();

  if (normalized === "POSITIVE") {
    return "😊";
  }

  if (normalized === "NEGATIVE") {
    return "😞";
  }

  return "😐";
}

function getSentimentStyle(sentiment) {
  const normalized = sentiment?.toUpperCase();

  if (normalized === "POSITIVE") {
    return {
      padding: "7px 10px",
      borderRadius: "20px",
      background: "#DCFCE7",
      color: "#166534",
      fontSize: "12px",
      fontWeight: "700",
    };
  }

  if (normalized === "NEGATIVE") {
    return {
      padding: "7px 10px",
      borderRadius: "20px",
      background: "#FEE2E2",
      color: "#B91C1C",
      fontSize: "12px",
      fontWeight: "700",
    };
  }

  return {
    padding: "7px 10px",
    borderRadius: "20px",
    background: "#FEF3C7",
    color: "#92400E",
    fontSize: "12px",
    fontWeight: "700",
  };
}
