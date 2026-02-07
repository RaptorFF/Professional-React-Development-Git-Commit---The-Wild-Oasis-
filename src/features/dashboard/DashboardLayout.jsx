import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import styled from "styled-components";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import Spinner from "../../ui/Spinner";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: bookingsPending, bookings } = useRecentBookings();
  const {
    isPending: staysPending,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isPending: cabinsPending, cabins } = useCabins();

  if (bookingsPending || staysPending || cabinsPending) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabins={cabins}
      />
      <div>Todays activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
