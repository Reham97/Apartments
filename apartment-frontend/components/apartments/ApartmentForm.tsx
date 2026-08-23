"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlignLeft,
  Bath,
  BedDouble,
  Building2,
  ImagePlus,
  Loader2,
  MapPin,
  Maximize,
  Phone,
  Save,
  Tag,
  Trash2,
} from "lucide-react";

import { createApartment } from "@/services/apartments.service";

interface FormValues {
  title: string;
  description: string;
  address: string;
  city: string;
  contactPhone: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
}

const initialValues: FormValues = {
  title: "",
  description: "",
  address: "",
  city: "",
  contactPhone: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
};

export function ApartmentForm() {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidFile) {
      setError("Please select valid image files only.");
      return;
    }

    setError("");

    setImages((currentImages) => [
      ...currentImages,
      ...files,
    ]);

    // Allows selecting the same image again after removing it.
    event.target.value = "";
  }

  function removeImage(index: number) {
    setImages((currentImages) =>
      currentImages.filter((_, currentIndex) => currentIndex !== index),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !values.title.trim() ||
      !values.address.trim() ||
      !values.city.trim() ||
      !values.contactPhone.trim() ||
      !values.price ||
      !values.bedrooms ||
      !values.bathrooms ||
      !values.area
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      Number(values.price) <= 0 ||
      Number(values.bedrooms) <= 0 ||
      Number(values.bathrooms) <= 0 ||
      Number(values.area) <= 0
    ) {
      setError(
        "Price, bedrooms, bathrooms, and area must be greater than zero.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("title", values.title.trim());
      formData.append("description", values.description.trim());
      formData.append("address", values.address.trim());
      formData.append("city", values.city.trim());
      formData.append(
        "contactPhone",
        values.contactPhone.trim(),
      );
      formData.append("price", values.price);
      formData.append("bedrooms", values.bedrooms);
      formData.append("bathrooms", values.bathrooms);
      formData.append("area", values.area);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const apartment = await createApartment(formData);

      router.replace(`/apartments/${apartment.id}`);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to add the apartment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClear() {
    setValues(initialValues);
    setImages([]);
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      {error && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Apartment title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="e.g. Modern apartment in Zamalek"
          icon={<Building2 className="size-5" />}
          className="sm:col-span-2"
        />

        <FormField
          label="Address"
          name="address"
          value={values.address}
          onChange={handleChange}
          placeholder="e.g. 15 Nile Street"
          icon={<MapPin className="size-5" />}
        />

        <FormField
          label="City"
          name="city"
          value={values.city}
          onChange={handleChange}
          placeholder="e.g. Cairo"
          icon={<MapPin className="size-5" />}
        />

        <FormField
          label="Contact phone"
          name="contactPhone"
          type="tel"
          value={values.contactPhone}
          onChange={handleChange}
          placeholder="e.g. +20 10 1234 5678"
          icon={<Phone className="size-5" />}
        />

        <FormField
          label="Monthly price"
          name="price"
          type="number"
          min="1"
          value={values.price}
          onChange={handleChange}
          placeholder="e.g. 25000"
          icon={<Tag className="size-5" />}
        />

        <FormField
          label="Bedrooms"
          name="bedrooms"
          type="number"
          min="1"
          value={values.bedrooms}
          onChange={handleChange}
          placeholder="e.g. 3"
          icon={<BedDouble className="size-5" />}
        />

        <FormField
          label="Bathrooms"
          name="bathrooms"
          type="number"
          min="1"
          value={values.bathrooms}
          onChange={handleChange}
          placeholder="e.g. 2"
          icon={<Bath className="size-5" />}
        />

        <FormField
          label="Area (m²)"
          name="area"
          type="number"
          min="1"
          value={values.area}
          onChange={handleChange}
          placeholder="e.g. 140"
          icon={<Maximize className="size-5" />}
        />

        {/* Images */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Apartment images
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-blue-300 hover:bg-blue-50/50">
            <div className="flex size-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <ImagePlus className="size-5" />
            </div>

            <span className="mt-3 text-sm font-semibold text-slate-700">
              Upload apartment images
            </span>

            <span className="mt-1 text-xs text-slate-500">
              You can select multiple images
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="sr-only"
              disabled={isSubmitting}
            />
          </label>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((image, index) => {
                const imageUrl = URL.createObjectURL(image);

                return (
                  <div
                    key={`${image.name}-${index}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Apartment image ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={isSubmitting}
                      aria-label={`Remove image ${index + 1}`}
                      className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-lg bg-white/90 text-red-600 shadow-sm backdrop-blur transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="size-4" />
                    </button>

                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/75 px-2 py-1 text-[10px] font-semibold text-white">
                        Cover image
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Description
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 flex pt-3.5 pl-4 text-slate-400">
              <AlignLeft className="size-5" />
            </div>

            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              rows={5}
              disabled={isSubmitting}
              placeholder="Describe the apartment, location, features, and nearby amenities..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={handleClear}
          disabled={isSubmitting}
          className="h-12 rounded-xl px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear form
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Adding apartment...
            </>
          ) : (
            <>
              <Save className="size-4" />
              Add apartment
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  name: Exclude<keyof FormValues, "description">;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  icon: ReactNode;
  type?: string;
  min?: string;
  className?: string;
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  min,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          {icon}
        </div>

        <input
          id={name}
          name={name}
          type={type}
          min={min}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
}