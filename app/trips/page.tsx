import EmptyState from "../components/EmptyState";

import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

//This is server component
const TripsPage = async () => {
  //Get the current user
  const currentUser = await getCurrentUser();

  //If no current user show this
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  //Get the reservations of the current user
  const reservations = await getReservations({ userId: currentUser.id });

  //If no reservations show this
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No trips found" subtitle="Looks like you have'nt reserved any trips" />
      </ClientOnly>
    );
  }

  //Else show this
  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
