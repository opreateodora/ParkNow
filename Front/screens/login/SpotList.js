import styles from "./styleSpot";
import React, { PureComponent, Fragment } from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { Actions } from "react-native-router-flux";
import { GetSpot } from "./index";
import { FlatList } from "react-native-gesture-handler";

const ORANGE = "#d35400";
const LIGHT_GRAY = "black";

class SpotList extends PureComponent{
    componentWillMount() {
        this.props.GetSpot();
    }
  handleRowPress = (item) => {
    this.props.navigation.navigate(item);
  };
  onPressBack = () => {
    Actions.MapComponent();
  };/*
  
  onPressDelete = () => {
    this.props.GetSpot();
    Actions.Home();
  };*/

  state = {
    isFocused: false,
  };

  handleFocus = (event) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  handleBlur = (event) => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const { data, onFocus, onBlur, ...otherProps} = this.props; //in props primesc data
    const { isFocused, id_user} = this.state;

    return (
      <View>
        <Wrapper>
            <ScrollView>
          <FlatList
            data={this.props.data}
            renderItem={(data) => (
                <View style={styles.container}>
                <Text style={styles.textDesc}>Id: {data.item.id}</Text>
                <Text style={styles.textDesc}>Full name: {data.item.fullName}</Text>
                <Text style={styles.textDesc}>Lat: {data.item.spotLatitude}</Text>
                <Text style={styles.textDesc}>Full name: {data.item.spotLongitude}</Text>
              </View>
            )}
            keyExtractor={(data) => data}
          />
          </ScrollView>
          <View>
                <TextInput
                  placeholder = "User id"
                  selectionColor={ORANGE}
                  placeholderTextColor="#666"
                  underlineColorAndroid={isFocused ? ORANGE : LIGHT_GRAY}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onChangeText={(value) => this.setState({ id_user: value })}
                  style={styles.textInput}
                  {...otherProps}
                />
              </View>
          <ButtonWrapper>
            <Fragment>
            <StyledButton onPress={this.onPressDelete}>
                <StyledTitle>{"Delete"}</StyledTitle>
              </StyledButton>
              <StyledButton transparent onPress={this.onPressBack}>
                <StyledTitle>{"Back"}</StyledTitle>
              </StyledButton>
            </Fragment>
          </ButtonWrapper>
        </Wrapper>
      </View>
    );
  }
}

export const Title = styled.Text`
  color: #666;
  margin: 20% 0px 20px;
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
`;

export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 100px;
  align-items: center;
  flex-direction: column;
`;

const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${(props) => (props.transparent ? "transparent" : "#F79F1F")};
 padding:15px;
 border:${(props) => (props.transparent ? "1px solid #F79F1F " : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;

const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${(props) => (props.transparent ? "#eccc68 " : "#666")};
`;

const mapStateToProps = ({ get }) => {
  const { data } = get;
  return { data };
};
export default connect(mapStateToProps, {GetSpot} )(SpotList);
