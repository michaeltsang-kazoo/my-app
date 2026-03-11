import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

import { useSession } from "../../providers/SessionProvider";

export default function AppLayout() {
  console.log("Rendering app layout");
  const { session, isLoading } = useSession();

  console.log("Session:", session, "Is Loading:", isLoading);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    console.log("Session is loading...");
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    console.log("No session found, redirecting to /explore screen...");
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/explore" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
