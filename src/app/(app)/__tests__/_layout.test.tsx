import { SessionProvider } from "@/providers/SessionProvider";
import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import { Text, View } from "react-native";
import AppLayout from "../_layout";

describe("AppLayout", () => {
  it("still goes into render loop with conditional redirect", async () => {
    renderRouter({
      _layout: () => (
        <SessionProvider>
          <AppLayout />
        </SessionProvider>
      ),
      index: () => {
        console.log("Rendering home screen");
        return (
          <View>
            <Text>Home Screen</Text>
          </View>
        );
      },
      explore: () => {
        console.log("Rendering explore screen");
        return (
          <View>
            <Text>Explore Screen</Text>
          </View>
        );
      },
    });

    await waitFor(() => {
      expect(screen).toHavePathname("/explore");
    });
  });
});
