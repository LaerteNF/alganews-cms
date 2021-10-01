import { useParams } from "react-router-dom";
import usePageTitle from "../../core/hooks/usePageTitle";
import DefaultLayout from "../../layouts/Default/Default.layout";
import PostForm from "../features/PostForm";

export default function PostEditView () {

  const params = useParams<{ id: string }>()

  usePageTitle("Editar post")

  return <DefaultLayout>
    <PostForm postId={Number(params.id)}/>
  </DefaultLayout>

}