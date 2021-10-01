import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import useUser from "../../core/hooks/useUser";
import ValueDescriptot from "../components/ValueDescriptor/ValueDescriptor";

export default function UserEarnings() {
  
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if(!user)
    return <UserEarningsWrapper style={{ height: 123 }}>
      <Skeleton  width={150} height={40}/>
      <Skeleton  width={150} height={40}/>
      <Skeleton  width={150} height={40}/>
      <Skeleton  width={150} height={40}/>
    </UserEarningsWrapper>

  return <UserEarningsWrapper>
    <ValueDescriptot color="primary" description="Ganhos no mês" value={user.metrics.monthlyEarnings} isCurrency/>
    <ValueDescriptot color="primary" description="Ganhos na semana" value={user.metrics.weeklyEarnings} isCurrency/>
    <ValueDescriptot color="default" description="Ganhos de sempre" value={user.metrics.lifetimeEarnings} isCurrency/>
    <ValueDescriptot color="default" description="Total de palavras" value={user.metrics.lifetimeWords} />
  </UserEarningsWrapper>
}

const UserEarningsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

`