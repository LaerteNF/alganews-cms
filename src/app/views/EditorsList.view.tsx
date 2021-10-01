import DefaultLayout from "../../layouts/Default/Default.layout";

import usePageTitle from "../../core/hooks/usePageTitle";
import EditorsLists from "../features/EditorsList";

export default function EditorsListView () {
    usePageTitle('Lista de editores')

    return <DefaultLayout>
      <EditorsLists />
    </DefaultLayout>

}