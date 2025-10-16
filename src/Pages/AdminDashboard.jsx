import React, { useState } from "react";

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "textarea", label: "Paragraph (Textarea)" },
  { value: "select", label: "Dropdown" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "file", label: "File Upload" },
];

const defaultEventData = {
  title: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  isPaid: false,
  price: "",
  banner: null,
};

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState(defaultEventData);
  const [formFields, setFormFields] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [events, setEvents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Handlers used in JSX
  function handleEventInput(e) {
    const { name, value, type, checked, files } = e.target;
    if (name === "banner") {
      setEventData({ ...eventData, banner: files[0] });
      setImgPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else if (type === "checkbox") {
      setEventData({ ...eventData, [name]: checked });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  }

  function addField() {
    setFormFields([
      ...formFields,
      {
        id: Date.now(),
        label: "",
        type: "text",
        required: false,
        options: [],
      },
    ]);
  }

  function removeField(id) {
    setFormFields(formFields.filter((f) => f.id !== id));
  }

  function handleFieldChange(idx, key, value) {
    setFormFields(
      formFields.map((field, i) =>
        i === idx ? { ...field, [key]: value } : field
      )
    );
  }

  function handleOptionChange(idx, optionIdx, value) {
    setFormFields(
      formFields.map((field, i) =>
        i === idx
          ? {
              ...field,
              options: field.options.map((opt, oi) =>
                oi === optionIdx ? value : opt
              ),
            }
          : field
      )
    );
  }

  function addOption(idx) {
    setFormFields(
      formFields.map((field, i) =>
        i === idx ? { ...field, options: [...field.options, ""] } : field
      )
    );
  }

  function removeOption(idx, optionIdx) {
    setFormFields(
      formFields.map((field, i) =>
        i === idx
          ? {
              ...field,
              options: field.options.filter((_, oi) => oi !== optionIdx),
            }
          : field
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newEvent = {
      meta: { ...eventData, banner: imgPreview },
      fields: formFields,
    };
    if (editIndex != null) {
      const copy = [...events];
      copy[editIndex] = newEvent;
      setEvents(copy);
      setEditIndex(null);
    } else {
      setEvents([newEvent, ...events]);
    }
    setShowModal(false);
    setEventData(defaultEventData);
    setFormFields([]);
    setImgPreview(null);
  }

  function handleEdit(idx) {
    const evt = events[idx];
    setEventData({ ...evt.meta, banner: null });
    setImgPreview(evt.meta.banner);
    setFormFields(evt.fields);
    setEditIndex(idx);
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-12">
      <button
        onClick={() => {
          setShowModal(true);
          setEditIndex(null);
        }}
        className="bg-[#f02e65] text-white font-bold text-lg px-6 sm:px-10 py-3 sm:py-5 rounded-2xl shadow-lg hover:bg-pink-700 transition mb-10 sm:mb-14 w-full max-w-xs sm:max-w-fit"
      >
        Create New Event
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0"
          style={{
            background:
              "linear-gradient(135deg, #ffffff, #fce4ec, #f8bbd0, #f02e65)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 8s ease infinite",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border-2 border-[#f02e65] shadow-2xl w-full max-w-2xl p-5 sm:p-8 mx-2 sm:mx-auto overflow-y-auto max-h-[90vh] relative"
          >
            <h2 className="text-2xl font-bold mb-5 text-[#f02e65] text-center sm:text-left">
              {editIndex != null ? "Edit Event" : "Create New Event"}
            </h2>

            {/* Event details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
              <div>
                <label className="font-semibold text-sm">Title*</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  required
                  value={eventData.title}
                  onChange={handleEventInput}
                  className="w-full border-2 border-[#f02e65] outline-none rounded-xl focus:bg-[#ffebf1] mt-1 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-semibold text-sm">Date*</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={eventData.date}
                  onChange={handleEventInput}
                  className="w-full border-2 border-[#f02e65] outline-none rounded-xl focus:bg-[#ffebf1] mt-1 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-semibold text-sm">Venue*</label>
                <input
                  type="text"
                  name="venue"
                  placeholder="Event Venue"
                  required
                  value={eventData.venue}
                  onChange={handleEventInput}
                  className="w-full border-2 border-[#f02e65] outline-none rounded-xl focus:bg-[#ffebf1] mt-1 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-semibold text-sm">Event Time*</label>
                <input
                  type="text"
                  name="time"
                  required
                  placeholder="e.g. 9:00 AM – 6:00 PM"
                  value={eventData.time}
                  onChange={handleEventInput}
                  className="w-full border-2 border-[#f02e65] outline-none rounded-xl focus:bg-[#ffebf1] mt-1 px-3 py-2"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="font-semibold text-sm">Banner Image</label>
                <input
                  type="file"
                  name="banner"
                  accept="image/*"
                  onChange={handleEventInput}
                  className="w-full sm:w-44 border-2 border-[#f02e65] outline-none rounded-xl focus:bg-[#ffebf1] mt-1 sm:mt-0 px-2 py-2"
                />
              </div>
              <div>
                <label className="font-semibold text-sm">
                  Is This Event Paid?
                </label>
                <div className="flex flex-wrap gap-3 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPaid"
                      checked={eventData.isPaid}
                      onChange={handleEventInput}
                      className="mr-2 accent-[#f02e65]"
                    />
                    Paid Event
                  </label>
                  {eventData.isPaid && (
                    <input
                      type="number"
                      name="price"
                      min="0"
                      value={eventData.price}
                      onChange={handleEventInput}
                      placeholder="Price (₹)"
                      className="border-2 border-[#f02e65] outline-none px-3 py-2 rounded-xl w-28 sm:w-40"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Event description */}
            <div className="mb-6">
              <label className="font-semibold text-sm">
                Detailed Description*
              </label>
              <textarea
                name="description"
                placeholder="Provide Detailed Description"
                required
                value={eventData.description}
                onChange={handleEventInput}
                rows={3}
                className="w-full border-2 border-[#f02e65] outline-none rounded-xl focus:bg-[#ffebf1] mt-1 px-3 py-2 resize-y"
              />
            </div>

            {/* Dynamic form builder */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-md text-[#f02e65]">
                  Custom Registration Fields
                </h3>
                <button
                  type="button"
                  onClick={addField}
                  className="bg-[#f02e65] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-pink-700"
                >
                  Add Field
                </button>
              </div>
              {formFields.length === 0 && (
                <div className="text-gray-700 mb-3">
                  No custom fields yet. Click "Add Field"!
                </div>
              )}
              <div className="space-y-4 border-2 border-[#f02e65] outline-none rounded-2xl p-3">
                {formFields.map((field, i) => (
                  <div key={field.id}>
                    <div className="flex gap-3 flex-wrap w-full">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          handleFieldChange(i, "label", e.target.value)
                        }
                        placeholder="Field Label (e.g. Full Name)"
                        className="border-2 border-[#f02e65] outline-none px-3 py-2 rounded-xl flex-grow"
                        required
                      />
                      <select
                        value={field.type}
                        onChange={(e) =>
                          handleFieldChange(i, "type", e.target.value)
                        }
                        className="border-2 border-[#f02e65] outline-none px-3 py-2 rounded-xl"
                      >
                        {FIELD_TYPES.map((ft) => (
                          <option key={ft.value} value={ft.value}>
                            {ft.label}
                          </option>
                        ))}
                      </select>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) =>
                            handleFieldChange(i, "required", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Required
                      </label>
                      <button
                        type="button"
                        onClick={() => removeField(field.id)}
                        className="bg-red-100 text-red-700 rounded px-2 py-1 font-bold text-sm hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                    {["select", "radio", "checkbox"].includes(field.type) && (
                      <div className="mt-2">
                        <div className="font-medium mb-1">Options:</div>
                        {field.options.map((opt, oi) => (
                          <div key={oi} className="flex gap-2 mb-1">
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(i, oi, e.target.value)
                              }
                              placeholder={`Option ${oi + 1}`}
                              className="border px-2 py-1 rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(i, oi)}
                              className="text-red-600 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(i)}
                          className="bg-[#f02e65] text-white px-2 py-1 rounded font-bold text-xs mt-1 hover:bg-pink-700"
                        >
                          Add Option
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-6">
              <button
                type="submit"
                className="bg-[#f02e65] text-white font-bold px-6 py-3 rounded-xl hover:bg-pink-700 transition w-full sm:w-auto"
              >
                {editIndex !== null ? "Save Changes" : "Create Event"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEventData(defaultEventData);
                  setFormFields([]);
                  setImgPreview(null);
                  setEditIndex(null);
                }}
                className="bg-gray-100 text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="mt-10 w-full max-w-7xl px-2 sm:px-8">
        {events.length > 0 && (
          <h2 className="text-3xl sm:text-4xl font-semibold mb-7 text-[#f02e65] text-center sm:text-left">
            Your Created Events
          </h2>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
