import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export const movieFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.number().min(1888, "Invalid year"),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  directors: z.array(z.string()).optional(),
  cast: z.array(z.string()).optional(),
  plot: z.string().optional(),
  poster: z.string().url("Poster must be a valid URL").optional(),
  runtime: z.number().min(1, "Runtime required"),
  languages: z.array(z.string()).min(1, "Language"),
  countries: z.array(z.string()).min(1, "Country is required"),
  imdb: z.object({
    rating: z.number().min(1, "IMDb rating required"),
    votes: z.number().min(0, "Votes required"),
  }),
  awards: z.object({
    wins: z.number().min(0, "Wins required"),
    nominations: z.number().min(0, "Nominations required"),
    text: z.string().min(1, "Text required"),
  }),
});

export type MovieFormValues = z.infer<typeof movieFormSchema>;

type MovieFormProps = {
  submitLabel: string;
  defaultValues?: MovieFormValues;
  onSubmit: SubmitHandler<MovieFormValues>;
  isPending?: boolean;
};

export const MovieForm = ({
  submitLabel,
  defaultValues,
  onSubmit,
  isPending,
}: MovieFormProps) => {
  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: defaultValues ?? {
      title: "",
      year: new Date().getFullYear(),
      genres: [],
      directors: [],
      cast: [],
      plot: "",
      poster: "",
      runtime: 1,
      languages: [],
      countries: [],
      imdb: {
        rating: 0,
        votes: 0,
      },
      awards: {
        wins: 0,
        nominations: 0,
        text: "",
      },
    },
  });

  return (
    <div className="max-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Title: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="genres"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Genres: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                value={field.value?.join(", ") || ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  )
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="directors"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Directors: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                value={field.value?.join(", ") || ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  )
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="cast"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Casts: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                value={field.value?.join(", ") || ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  )
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="plot"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Plot: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="poster"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Poster: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="year"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Release Year: </FieldLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="runtime"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Runtime: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="languages"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Languages (comma-separated): </FieldLabel>
              <Input
                {...field}
                value={
                  Array.isArray(field.value)
                    ? field.value.join(", ")
                    : field.value
                }
                onChange={(e) =>
                  field.onChange(e.target.value.split(",").map((s) => s.trim()))
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="countries"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Countries: </FieldLabel>
              <Input
                {...field}
                value={
                  Array.isArray(field.value)
                    ? field.value.join(", ")
                    : field.value
                }
                onChange={(e) =>
                  field.onChange(e.target.value.split(",").map((s) => s.trim()))
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="imdb.rating"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>IMDb rating: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="awards.wins"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Awards: </FieldLabel>
              <Input
                {...field}
                id={field.name}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </form>
    </div>
  );
};
