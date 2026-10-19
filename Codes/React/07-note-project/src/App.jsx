import { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [note, setNote] = useState("");
  const [textarea, setTextarea] = useState("");

  const onChangeNoteHandler = (e) => setNote(e.target.value);
  const onChangeTextareaHandler = (e) => setTextarea(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!note.trim() && !textarea.trim()) return;

    const newNote = {
      id: Date.now(),
      title: note,
      content: textarea,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setData([newNote, ...data]);
    setNote("");
    setTextarea("");
  };

  const deleteNoteHandler = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">
        
        {/* LEFT COLUMN: Add Notes Form */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Add Notes</h1>
          
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Enter Notes Heading"
                value={note}
                onChange={onChangeNoteHandler}
                className="w-full bg-black border border-white rounded-md px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            <div>
              <textarea
                placeholder="Write Details here"
                value={textarea}
                onChange={onChangeTextareaHandler}
                rows={6}
                className="w-full bg-black border border-white rounded-md px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 text-black font-semibold py-3 rounded-md transition-colors duration-200"
            >
              Add Note
            </button>
          </form>
        </div>

        {/* MIDDLE DIVIDER (Desktop) */}
        <div className="hidden md:block w-[1px] bg-zinc-800 self-stretch"></div>

        {/* RIGHT COLUMN: Recent Notes */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold tracking-tight mb-8">Recent Notes</h2>

          {data.length === 0 ? (
            <p className="text-zinc-500 italic">No notes added yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-[#fefce8] text-black rounded-2xl p-5 pt-8 shadow-lg flex flex-col justify-between min-h-[220px]"
                >
                  {/* Notepad Spiral Binding Rings */}
                  <div className="absolute -top-3 left-0 right-0 flex justify-around px-4 pointer-events-none">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-6 bg-black rounded-full border border-zinc-700 shadow-sm"
                      />
                    ))}
                  </div>

                  {/* Note Title & Content with Paper Lines */}
                  <div>
                    <h3 className="font-extrabold text-xl text-black mb-1 break-words">
                      {item.title || "Untitled"}
                    </h3>
                    <p className="text-zinc-500 font-medium text-base leading-relaxed break-words">
                      {item.content}
                    </p>

                    {/* Faint Horizontal Lines (Notepad Effect) */}
                    <div className="mt-3 space-y-3 pointer-events-none">
                      <div className="border-b border-zinc-200/80 w-full h-1"></div>
                      <div className="border-b border-zinc-200/80 w-full h-1"></div>
                      <div className="border-b border-zinc-200/80 w-full h-1"></div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => deleteNoteHandler(item.id)}
                      className="w-full bg-[#d90429] hover:bg-red-700 text-white font-bold py-2 rounded-xl text-sm transition-colors shadow-sm"
                    >
                      delete note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;