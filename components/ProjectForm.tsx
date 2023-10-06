"use client";

import Image from "next/image";

import { SessionInterface } from "@/common.types";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const form = {
    image: "",
    title: "",
    desc: "",
    liveURL: "",
    githubURL: "",
    category: "",
  };
  const handleSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleStateChange = (filedName: string, value: string) => {};
  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Title"
        setState={(value) => handleStateChange("title", value)}
        isTextAres={false}
      />
      <FormField
        title="Description"
        state={form.desc}
        placeholder="Write abt your project"
        setState={(value) => handleStateChange("desc", value)}
        isTextAres={false}
      />
      <FormField
        title="url"
        state={form.liveURL}
        placeholder="http://yourprojectdeployedurl.com"
        setState={(value) => handleStateChange("liveURL", value)}
        isTextAres={false}
      />
      <FormField
        title="url"
        state={form.githubURL}
        placeholder="https://github.com/yourprojectsourcecodeurl"
        setState={(value) => handleStateChange("githubURL", value)}
        isTextAres={false}
      />

      <CustomMenu
        title="Categories"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
    </form>
  );
};

export default ProjectForm;
