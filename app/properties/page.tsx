import EmptyState from "../components/EmptyState";

import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

//This is server component
const PropertiesPage = async () => {
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
  const listings = await getListings({ userId: currentUser.id });

  //If no reservations show this
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you have no properties" />
      </ClientOnly>
    );
  }

  //Else show this
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
