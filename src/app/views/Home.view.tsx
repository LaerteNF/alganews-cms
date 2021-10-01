import usePageTitle from "../../core/hooks/usePageTitle"
import DefaultLayout from "../../layouts/Default/Default.layout"
import ErrorBoundary from "../components/ErrorBoundary"
import PostList from "../features/PostsList"
import UserEarnings from "../features/UserEarnings"
import UserPerformance from "../features/UserPerformance"
import UserTopTags from "../features/UserTopTags"

export default function Home () {
  usePageTitle('Home')

  return <DefaultLayout>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignContent: 'center', gap: 32}}>
      <UserTopTags />
      <UserEarnings />
    </div>
    <UserPerformance />
    <ErrorBoundary component={'lista de posts'}>
      <PostList />
    </ErrorBoundary>
  </DefaultLayout>
}