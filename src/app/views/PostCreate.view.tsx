import usePageTitle from "../../core/hooks/usePageTitle";
import DefaultLayout from "../../layouts/Default/Default.layout";
import PostForm from "../features/PostForm";

export default function PostCreateView () {
  usePageTitle("Novo post")

  return <DefaultLayout>
    <PostForm />
  </DefaultLayout>

}