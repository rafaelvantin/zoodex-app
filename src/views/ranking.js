import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Ranking({ navigation }) {
  const animals = [
    {
      name: "Tigre de Sumatra",
      likes: 4,
      image:
        "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",

      times: 100,
      id: "30",
    },
    {
      name: "Girafa",
      likes: 20,
      image:
        "https://segredosdomundo.r7.com/wp-content/uploads/2020/04/girafa-caracteristicas-e-comportamento-da-especie-1.jpg",
      times: 100,
      id: "34",
    },
    {
      name: "Macaco Prego",
      likes: 40,
      image:
        "https://s2.glbimg.com/50Idnx6C06sgR4s-S7sodZ0tkQk=/290x217/s2.glbimg.com/29x2zOKPeF5SzbRqEPtHxSAeND8=/300x225/s.glbimg.com/jo/g1/f/original/2016/11/29/img_3706.jpg",
      times: 100,
      id: "36",
    },
    {
      name: "Camelo",
      likes: 11,
      image:
        "https://super.abril.com.br/wp-content/uploads/2018/07/camelo_competencias_experiencia_habilidade.jpg",
      times: 100,
      id: "20",
    },
    {
      name: "Arara-azul",
      likes: 60,
      image:
        "https://static.escolakids.uol.com.br/conteudo_legenda/a-arara-azul-uma-ave-familia-dos-psitacideos-5c8a3e0c53ef2.jpg",
      times: 100,
      id: "14",
    },
    {
      name: "Babuíno",
      likes: 20,
      image:
        "https://veja.abril.com.br/wp-content/uploads/2017/01/babuino-guine-20110830-007.jpg",
      times: 100,
      id: "16",
    },
    {
      name: "Jacaré",
      likes: 10,
      image: "https://www.ninha.bio.br/biologia/repteis_anfibios/jacare32.jpg",
      times: 100,
      id: "50",
    },
    {
      name: "Jiboia",
      likes: 62,
      image:
        "https://static.biologianet.com/conteudo/images/a-jiboia-uma-serpente-pertencente-familia-boidae-essa-especie-apresenta-habitos-terrestres-arboricolas-5ca608821c6e3.jpg",
      times: 100,
      id: "674",
    },
    {
      name: "Flamingo",
      likes: 70,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/68/Lightmatter_flamingo2.jpg",
      times: 990,
      id: "66",
    },
  ];

  const [animalsSorted, setAnimalsSorted] = React.useState([]);

  React.useEffect(() => {
    setAnimalsSorted(
      animals.sort((a, b) => {
        if (a.likes > b.likes) return -1;
        if (a.likes < b.likes) return 1;
        return 0;
      })
    );
  }, []);

  const imageURL =
    "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  const listHeaderComponent = (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={["#19A186", "#F2CF43"]}
        style={styles.linearGradient}
      >
        <View style={styles.menuIcon}>
          <Ionicons
            name="md-menu"
            size={45}
            color="white"
            onPress={() => navigation.openDrawer()}
          />
        </View>

        <Text style={styles.title}>RANK</Text>

        <View style={styles.columns}>
          <View style={styles.columnNameContainer}>
            <Text style={styles.columnName}>NOME</Text>
          </View>
          <View style={styles.columnLikesContainer}>
            <Text style={styles.columnLikes}>
              <Ionicons name="md-heart" color="#fff" size={30} />
            </Text>
          </View>
          <View style={styles.columnTimesContainer}>
            <Ionicons name="md-people" color="#fff" size={30} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.positionContainer}>
          <Text style={styles.position}>{index + 1}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarMask}>
            <Image style={styles.avatar} source={{ uri: item.image }} />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.likesContainer}>
          <Text style={styles.likes}>{item.likes}</Text>
        </View>
        <View style={styles.timesContainer}>
          <Text style={styles.times}>{item.times}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        keyExtractor={(item) => item.id}
        data={animalsSorted}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 350,
  },
  linearGradient: {
    flex: 1,
  },
  menuIcon: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  title: {
    marginTop: 120,
    marginLeft: 20,
    color: "white",
    fontSize: 80,
    fontWeight: "bold",
  },

  columns: {
    position: "absolute",
    bottom: 20,
    paddingLeft: 70,
    alignItems: "center",
    flexDirection: "row",
  },

  columnNameContainer: {
    flexBasis: 0,
    flexGrow: 4,
  },
  columnLikesContainer: {
    flexBasis: 0,
    flexGrow: 1,
  },
  columnTimesContainer: {
    flexBasis: 0,
    flexGrow: 1,
  },

  columnName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  columnLikes: {
    color: "white",
    fontSize: 20,
  },
  columnTimes: {
    color: "white",
    fontSize: 20,
  },

  rowContainer: {
    paddingHorizontal: 5,
    width: "90%",
    height: 50,
    borderColor: "#1e1e1e",
    alignItems: "center",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "center",
    flexDirection: "row",
  },

  avatarMask: {
    height: 32,
    width: 32,
  },

  positionContainer: {
    flexBasis: 0,
    flexGrow: 1,
  },
  avatarContainer: {
    flexBasis: 0,
    flexGrow: 2,
    alignItems: "flex-start",
  },
  nameContainer: {
    flexBasis: 0,
    flexGrow: 10,
  },
  likesContainer: {
    flexBasis: 0,
    flexGrow: 2,
  },
  timesContainer: {
    flexBasis: 0,
    flexGrow: 2,
  },
  position: {
    fontWeight: "bold",
    fontSize: 20,
    opacity: 0.9,
  },
  avatar: {
    borderRadius: 10,
    flex: 1,
    opacity: 1,
    resizeMode: "cover",
  },
  name: {
    fontFamily: "Roboto",
    fontSize: 20,
    opacity: 0.9,
  },
  likes: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#7CAA4B",
  },
  times: {
    fontWeight: "900",
    fontSize: 20,
    opacity: 0.7,
    color: "#004710",
  },
});
