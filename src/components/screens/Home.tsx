import { useContext } from "react";
import { Button, View, Text } from "react-native";
import wordDataContext from "../../library/context/wordDataContext";
import getFile from "../../library/helpers/getFile";
import getRareWords from "../../library/helpers/getRareWords";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type RootStackParamList = {
  Home: undefined;
  Placeholder2: undefined;
};

type HomeProps = BottomTabScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation: { navigate } }: HomeProps) => {
  const context = useContext(wordDataContext);
  if (context === null)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  const { setWordData, setWordDataLoading, setWordDataError } = context;

  return (
    <View>
      <Button
        title="Upload PDF"
        onPress={() => {
          (async () => {
            try {
              const fileUri = await getFile();
              if (fileUri === undefined) return;

              setWordDataLoading(true);

              const rareWords = await getRareWords(fileUri);
              setWordData(rareWords);
              setWordDataError(undefined);
            } catch (err) {
              if (err instanceof Error) setWordDataError(err);
            } finally {
              setWordDataLoading(false);
            }
          })();
        }}
      />
      <Button
        title="Go to placeholder 2"
        onPress={() => navigate("Placeholder2")}
      />
    </View>
  );
};

export default Home;