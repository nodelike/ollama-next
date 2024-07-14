// SettingsPanel.js
import React, { useRef } from "react";
import { useChat } from "@/context/context";
import toast from "react-hot-toast";

function SettingsPanel() {
    const { state, dispatch } = useChat();
    const personaNameRef = useRef(null);
    const personaDescriptionRef = useRef(null);

    const handleModelChange = (event) => {
        const modelName = event.target.value;
        dispatch({ type: "SET_CURRENT_MODEL", payload: modelName });
        localStorage.setItem("model", modelName);
    };

    const handlePersonaChange = (event) => {
        const personaName = event.target.value;
        if (personaName !== "createPersona") {
            const selectedPersona = state.personas.find((p) => p.name === personaName);
            dispatch({ type: "SET_CURRENT_PERSONA", payload: selectedPersona });
            localStorage.setItem("personaName", personaName);
        } else {
            dispatch({ type: "SET_CURRENT_PERSONA", payload: { name: "", description: "" } });
        }
    };

    const handlePersonaSubmit = (event) => {
        event.preventDefault();
        const personaName = personaNameRef.current.value;
        const personaDescription = personaDescriptionRef.current.value;

        try {
            const newPersona = { name: personaName, description: personaDescription };
            const updatedPersonas = state.currentPersona.name ? state.personas.map((p) => (p.name === state.currentPersona.name ? newPersona : p)) : [...state.personas, newPersona];

            dispatch({ type: "UPDATE_PERSONAS", payload: updatedPersonas });
            dispatch({ type: "SET_CURRENT_PERSONA", payload: newPersona });
            localStorage.setItem("personas", JSON.stringify(updatedPersonas));
            localStorage.setItem("personaName", personaName);
            toast.success(state.currentPersona.name ? "Persona updated successfully!" : "Persona created successfully!");
        } catch (error) {
            toast.error(`Error in creating/updating persona: ${error.message}`);
        }
    };

    return (
        <div className={`flex-shrink-0 flex flex-col gap-6 py-4 px-6 transition-all duration-300 ease-in-out ${state.sidePanel.isOpen ? "opacity-100" : "opacity-0"}`}>
            {" "}
            {/* Model selection */}
            <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-lg">Select Model:</h4>
                <select
                    value={state.currentModel || ""}
                    onChange={handleModelChange}
                    className="w-full py-2 px-4 bg-primary rounded-md border border-borderColor cursor-pointer"
                    name="model"
                    id="model">
                    <option value="" hidden>
                        Select model
                    </option>
                    {state.models.map((model) => (
                        <option key={model.name} value={model.name}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Persona selection */}
            <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-lg">Select Persona:</h4>
                <select
                    value={state.currentPersona?.name || ""}
                    onChange={handlePersonaChange}
                    className="w-full py-2 px-4 bg-primary rounded-md border border-borderColor cursor-pointer"
                    name="persona"
                    id="persona">
                    <option value="" hidden>
                        Select personas
                    </option>
                    <option value="createPersona">Create a persona</option>
                    {state.personas.map((persona) => (
                        <option key={persona.name} value={persona.name}>
                            {persona.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Persona form */}
            <form className="flex flex-col gap-4" onSubmit={handlePersonaSubmit}>
                <input
                    ref={personaNameRef}
                    type="text"
                    className="w-full px-4 py-2 bg-tertiary rounded-md border border-borderColor focus:outline-none"
                    placeholder="Enter persona name..."
                    defaultValue={state.currentPersona?.name || ""}
                />
                <textarea
                    ref={personaDescriptionRef}
                    className="w-full p-4 bg-tertiary rounded-md border border-borderColor focus:outline-none"
                    placeholder="Enter persona description..."
                    defaultValue={state.currentPersona?.description || ""}
                />
                <button className="text-black bg-accent py-2 px-4 rounded-md border border-borderColor" type="submit">
                    {state.currentPersona?.name ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
}

export default SettingsPanel;
