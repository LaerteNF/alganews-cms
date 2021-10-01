import { Post } from "laerte_fernandes-sdk";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import selectPaginatedPosts from "../selectors/selectPaginatedPosts";
import selectPostsFetching from "../selectors/selectPostsFetching";
import * as PostActions from '../store/Post.slice'

export default function usePosts() {
  const dispatch = useDispatch()

  const paginatedPosts = useSelector(selectPaginatedPosts)
  const loading = useSelector(selectPostsFetching)

  // o encapsulamento no useCallback (aloca a declaração da função apenas uma vez na memória e não fica recriando nas montagens de componentes) é necessário para que caso essa função 
  // seja usada em um componente, no useEffect não cause loop infinito de renderização (após a função executar e mudar o valor do componente fazer a re-renderização do componente 
  // e ser considerado que a função foi redeclarada causando outra re-renderização e assim por diante gerando um loop infinito) pois o callback previne isso
  const fetchPosts = useCallback(
    async function(query: Post.Query) {
      dispatch(PostActions.fetchPosts(query))
    }, 
    [dispatch]
  )

  return {
    paginatedPosts,
    loading,
    fetchPosts
  }
}