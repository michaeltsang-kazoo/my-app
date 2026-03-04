import { Redirect, Stack } from "expo-router";
import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import { Text, View } from "react-native";

describe("Layout", () => {
  it("renders the correct screen", () => {
    renderRouter({
      _layout: () => <Stack />,
      index: () => (
        <View>
          <Text>Home Screen</Text>
        </View>
      ),
      explore: () => (
        <View>
          <Text>Explore Screen</Text>
        </View>
      ),
    });

    expect(screen).toHavePathname("/");
  });

  it("redirects from home screen to explore screen", async () => {
    renderRouter({
      _layout: () => <Stack />,
      index: () => {
        return <Redirect href="/explore" />;
      },
      explore: () => {
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

  it("goes into render loop", async () => {
    renderRouter({
      _layout: () => <Redirect href="/explore" />,
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
