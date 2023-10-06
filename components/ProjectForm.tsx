"use client";

import Image from "next/image";
import React from "react";

import { SessionInterface } from "@/common.types";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { addnewProject, fetchToken } from "@/config/action";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const [form, setform] = React.useState({
    image: "",
    title: "",
    desc: "",
    liveURL: "",
    githubURL: "",
    category: "",
  });

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "add") {
        await addnewProject(form, session?.user?.id, token);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) return alert("Please upload an image");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (filedName: string, value: string) => {
    setform((prevState) => ({ ...prevState, [filedName]: value }));
  };

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
          required={type === "add"}
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

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "add" ? "Adding" : "Editing"}`
              : `${type === "add" ? "Add" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
