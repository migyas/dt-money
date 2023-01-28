import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { Container } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions({ query }: SearchFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(query);
  }

  return (
    <Container onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Container>
  );
}
