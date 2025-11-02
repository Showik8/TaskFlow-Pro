import { type FC, useState } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: {
    title: string;
    description?: string;
    members?: string[];
  }) => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState(""); // emails input

  const handleCreate = () => {
    if (!name.trim()) return;

    // Split members by comma or newline and remove empty strings
    const membersArray = members
      .split(/[\n,]+/)
      .map((email) => email.trim())
      .filter((email) => email);

    onCreate({
      title: name.trim(),
      description: description?.trim(),
      members: membersArray,
    });

    setName("");
    setDescription("");
    setMembers("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fadeIn">
        <h2 className="text-xl font-semibold mb-5">Create New Project</h2>

        <div className="space-y-4">
          {/* Project Name */}
          <div className="space-y-1">
            <label htmlFor="project-name" className="font-medium">
              Project Name *
            </label>
            <input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Project"
              maxLength={100}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="project-description" className="font-medium">
              Description
            </label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description"
              rows={3}
              maxLength={500}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          {/* Members */}
          <div className="space-y-1">
            <label htmlFor="project-members" className="font-medium">
              Members (emails separated by comma or newline)
            </label>
            <textarea
              id="project-members"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="alice@example.com, bob@example.com"
              rows={3}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition"
          >
            Create
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
