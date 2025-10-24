import React, { useState } from "react";

// Supported form field types
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

  // Event info input handler
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

  // Add a custom field to the form
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

  // Handle event create and edit
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <button
        onClick={() => {
          setShowModal(true);
          setEditIndex(null);
        }}
        className="bg-[#f02e65] text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-lg hover:bg-pink-700 transition mb-14"
      >
        Create New Event
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #ffffff, #fce4ec, #f8bbd0, #f02e65)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 8s ease infinite",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border-2 border-[#f02e65] shadow-2xl w-full max-w-2xl p-8 overflow-y-auto max-h-[92vh] relative"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#f02e65]">
              {editIndex != null ? "Edit Event" : "Create New Event"}
            </h2>
            {/* Event meta fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="font-semibold text-sm">Title*</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  required
                  value={eventData.title}
                  onChange={handleEventInput}
                  className="border-2 border-[#f02e65] outline-none rounded-xl focus-within:bg-[#ffebf1] mt-1 w-full px-3 py-2  "
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
                  className="border-2 border-[#f02e65] outline-none rounded-xl focus-within:bg-[#ffebf1] mt-1 w-full px-3 py-2"
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
                  className="border-2 border-[#f02e65] outline-none rounded-xl focus-within:bg-[#ffebf1] mt-1 w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="font-semibold text-sm">Event Time*</label>
                <input
                  type="text"
                  name="time"
                  required
                  value={eventData.time}
                  onChange={handleEventInput}
                  placeholder="e.g. 9:00 AM – 6:00 PM"
                  className="border-2 border-[#f02e65] outline-none rounded-xl focus-within:bg-[#ffebf1] mt-1 w-full px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="font-semibold text-sm">Banner Image</label>
                <input
                  type="file"
                  name="banner"
                  accept="image/*"
                  onChange={handleEventInput}
                  className="border-2 border-[#f02e65] outline-none rounded-xl focus-within:bg-[#ffebf1] mt-1 w-40 px-2 py-2"
                />
                {/* {imgPreview && (
                  <img
                    src={imgPreview}
                    className="mt-2 rounded max-h-24 border"
                    alt="Event Banner Preview"
                  />
                )} */}
              </div>
              <div>
                <label className="font-semibold text-sm">
                  Is This Event Paid?
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPaid"
                      checked={eventData.isPaid}
                      onChange={handleEventInput}
                      className="mr-2"
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
                      className="border-2 border-[#f02e65] outline-none ml-2 px-3 rounded-xl w-30"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="font-semibold text-sm">
                Detailed Description*
              </label>
              <textarea
                name="description"
                placeholder="Provide Detailed Description of the Event"
                required
                value={eventData.description}
                onChange={handleEventInput}
                rows={2}
                className="border-2 border-[#f02e65] outline-none rounded-xl focus-within:bg-[#ffebf1] w-full mt-1 px-3 py-2 resize-y"
              />
            </div>
            {/* Dynamic form builder for registration fields */}
            <div className="mb-4">
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
                  <div key={field.id} className="p-2 bg-[#fff8fa] rounded-xl">
                    <div className="flex flex-wrap gap-3 w-full">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          handleFieldChange(i, "label", e.target.value)
                        }
                        placeholder="Field Label (e.g. Full Name)"
                        className="border-2 border-[#f02e65] outline-none px-3 py-2 rounded-xl flex-[2_1_180px] min-w-[130px] w-full sm:w-auto"
                        required
                      />
                      <select
                        value={field.type}
                        onChange={(e) =>
                          handleFieldChange(i, "type", e.target.value)
                        }
                        className="border-2 border-[#f02e65] outline-none px-3 py-2 rounded-xl flex-[1_1_120px] min-w-[90px] w-full sm:w-auto"
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
                          <div key={oi} className="flex gap-2 mb-1 flex-wrap">
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(i, oi, e.target.value)
                              }
                              placeholder={`Option ${oi + 1}`}
                              className="border px-2 py-1 rounded flex-1 min-w-[90px]"
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

            {/* Preview custom fields */}
            {formFields.length > 0 && (
              <div className="mb-6 border-t pt-4">
                <h4 className="font-bold text-gray-600 mb-3">
                  Registration Form Preview
                </h4>
                <form className="space-y-3">
                  {formFields.map((field) => (
                    <div key={field.id}>
                      <label className="block font-medium mb-1">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      {field.type === "text" && (
                        <input
                          type="text"
                          disabled
                          placeholder={field.label}
                          className="border-2 border-[#f02e65] px-2 py-1 rounded-xl w-full"
                        />
                      )}
                      {field.type === "number" && (
                        <input
                          type="number"
                          disabled
                          placeholder={field.label}
                          className="border px-2 py-1 rounded w-full"
                        />
                      )}
                      {field.type === "email" && (
                        <input
                          type="email"
                          disabled
                          placeholder={field.label}
                          className="border px-2 py-1 rounded w-full"
                        />
                      )}
                      {field.type === "textarea" && (
                        <textarea
                          disabled
                          placeholder={field.label}
                          className="border px-2 py-1 rounded w-full"
                          rows={2}
                        ></textarea>
                      )}
                      {field.type === "file" && (
                        <input
                          type="file"
                          disabled
                          className="border px-2 py-1 rounded w-full"
                        />
                      )}
                      {["select", "radio", "checkbox"].includes(field.type) &&
                        field.options.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {field.type === "select" && (
                              <select
                                disabled
                                className="border px-2 py-1 rounded"
                              >
                                {field.options.map((opt, i) => (
                                  <option key={i}>{opt}</option>
                                ))}
                              </select>
                            )}
                            {field.type === "radio" &&
                              field.options.map((opt, i) => (
                                <label className="mr-3" key={i}>
                                  <input type="radio" disabled /> {opt}
                                </label>
                              ))}
                            {field.type === "checkbox" &&
                              field.options.map((opt, i) => (
                                <label className="mr-3" key={i}>
                                  <input type="checkbox" disabled /> {opt}
                                </label>
                              ))}
                          </div>
                        )}
                    </div>
                  ))}
                </form>
              </div>
            )}
            <div className="flex gap-4 justify-end mt-4">
              <button
                type="submit"
                className="bg-[#f02e65] text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition"
              >
                {editIndex !== null ? "Save Changes" : "Create Event"}
              </button>
              <button
                type="button"
                className="bg-gray-100 text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200"
                onClick={() => {
                  setShowModal(false);
                  setEventData(defaultEventData);
                  setFormFields([]);
                  setImgPreview(null);
                  setEditIndex(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of created events */}
      <div className="mt-10 w-full max-w-7xl px-2 sm:px-8">
        {events.length > 0 && (
          <h2 className="text-4xl font-semibold mb-7 text-[#f02e65] px-1 sm:px-6">
            Your Created Events
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt, i) => (
            <div
              key={i}
              className="
          bg-white rounded-2xl border-2 border-[#f02e65]
          shadow-xl flex flex-col min-h-[470px] max-h-[470px]
          overflow-hidden transition hover:shadow-2xl duration-200
        "
            >
              <div className="w-full aspect-[3/2] bg-gray-100 overflow-hidden">
                {evt.meta.banner ? (
                  <img
                    src={evt.meta.banner}
                    alt={evt.meta.title}
                    className="w-full h-full object-cover object-center rounded-t-2xl"
                    draggable="false"
                  />
                ) : (
                  <div className="text-gray-300 text-lg flex items-center justify-center h-full">
                    No Banner
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between px-5 py-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-extrabold text-[#f02e65] truncate">
                      {evt.meta.title}
                    </h3>
                    <button
                      onClick={() => handleEdit(i)}
                      className="bg-gray-100 hover:bg-pink-100 text-[#f02e65] font-semibold px-4 py-1 rounded-lg border border-[#f02e65]"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm mb-1 truncate">
                    {evt.meta.date} | {evt.meta.time} @ {evt.meta.venue}
                  </div>
                  <div className="text-gray-700 text-sm mb-2 line-clamp-2">
                    {evt.meta.description}
                  </div>
                  <div className="mb-2">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full ${
                        evt.meta.isPaid
                          ? "bg-pink-100 text-[#f02e65]"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {evt.meta.isPaid ? `Paid (₹${evt.meta.price})` : "Free"}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg mt-1 px-3 pt-2 pb-1">
                  <div className="font-semibold text-black mb-1 text-sm">
                    Registration Fields:
                  </div>
                  <ul className="list-disc ml-4 mt-1 max-h-[54px] overflow-y-auto">
                    {evt.fields.length === 0 ? (
                      <li className="text-gray-400 text-xs">
                        No custom fields
                      </li>
                    ) : (
                      evt.fields.map((field) => (
                        <li
                          key={field.id}
                          className="capitalize truncate text-xs leading-tight"
                        >
                          {field.label}
                          <span className="text-[10px] text-gray-400 ml-1">
                            ({field.type})
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        {events.length === 0 && (
          <div className="text-gray-700 text-lg text-center py-12">
            No events created yet. Click 'Create New Event' above!
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
