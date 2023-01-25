import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledBackLink } from "../../../components/StyledBackLink.js";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    await fetch(`/api/places/${id}`, {
      method: "PATCH",
      body: JSON.stringify(place),
    });

    router.push("/");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
