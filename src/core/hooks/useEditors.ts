import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import * as EditorsActions from "../store/Editor.store";

export default function useEditors() {

  const dispatch = useDispatch()

  const loading = useSelector((state: RootState) => state.editor.fetching)

  const editorsList = useSelector(
    (state: RootState) => state.editor.editorList
  )

  const fetchAllEditors = useCallback(async function () {
    dispatch(EditorsActions.fetchAllEditors())
  }, [dispatch])

  return {
    loading,
    editorsList,
    fetchAllEditors
  }

}