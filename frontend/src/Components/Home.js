import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(null);

  const pktType = localStorage.getItem("pktType");
  const empId = localStorage.getItem("EmpId");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/pkt/getquestion/${pktType}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setQuestions(result.data);
        if (!questions) {
          toast.error("Unable to fetch Question");
          navigate("/");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/pkt/submitanswer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, pktType, empId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setScore(result.score);
      toast.success("PKT Submitted Succesfully ");
      navigate("/");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  console.log(answers);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/real/logoutwithoutsubmit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ empId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("logout Succesfully ");
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex">
                <button
                  className="bg-red-500 px-3 py-2 text-white rounded"
                  onClick={handleLogout}
                >
                  Logout{" "}
                </button>
                <p className="text-red-500 font-semibold ml-2">Warning : If You don't want to Complete Exam then Logout else Your score will be zero.</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {pktType}
        </h1>
        {questions.map((question) => (
          <div key={question._id} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {question.question}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`question-${question._id}-option_a`}
                  name={`question-${question._id}`}
                  value={question.option_a}
                  checked={answers[question.qnumber] === question.option_a}
                  onChange={() =>
                    handleChange(question.qnumber, question.option_a)
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor={`question-${question.qnumber}-option_a`}
                  className="ml-3 text-gray-700"
                >
                  {question.option_a}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`question-${question._id}-option_b`}
                  name={`question-${question._id}`}
                  value={question.option_b}
                  checked={answers[question.qnumber] === question.option_b}
                  onChange={() =>
                    handleChange(question.qnumber, question.option_b)
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor={`question-${question._id}-option_b`}
                  className="ml-3 text-gray-700"
                >
                  {question.option_b}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`question-${question._id}-option_c`}
                  name={`question-${question._id}`}
                  value={question.option_c}
                  checked={answers[question.qnumber] === question.option_c}
                  onChange={() =>
                    handleChange(question.qnumber, question.option_c)
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor={`question-${question._id}-option_c`}
                  className="ml-3 text-gray-700"
                >
                  {question.option_c}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`question-${question._id}-option_d`}
                  name={`question-${question._id}`}
                  value={question.option_d}
                  checked={answers[question.qnumber] === question.option_d}
                  onChange={() =>
                    handleChange(question.qnumber, question.option_d)
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor={`question-${question._id}-option_d`}
                  className="ml-3 text-gray-700"
                >
                  {question.option_d}
                </label>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Selected Answers:
          </h2>
          <ul className="list-disc list-inside mt-2">
            {Object.entries(answers).map(([questionId, answer]) => (
              <li key={questionId} className="text-gray-600">
                Question {questionId}:{" "}
                <span className="font-semibold text-blue-600">{answer}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Submit
          </button>
          {score !== null && (
            <h2 className="mt-6 text-lg font-semibold text-gray-800">
              Your Score: {score}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
