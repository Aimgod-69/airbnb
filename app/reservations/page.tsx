import EmptyState from "../components/EmptyState";

import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

//This is server component
const ReservationsPage = async () => {
  //First get the current user
  const currentUser = await getCurrentUser();

  //If no current user then show this
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  //Here we want to see all the reservations that ppl have done on our listings
  const reservations = await getReservations({ authorId: currentUser.id });

  //If no reservations found show this
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your porperty" />
      </ClientOnly>
    );
  }

  //Else
  return (
    <ClientOnly>
      <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ReservationsPage;
