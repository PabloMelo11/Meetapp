import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Header from '~/components/Header';
import Loading from '~/components/Loading';
import Meetup from '~/components/Meetup';
import EmptyList from '~/components/EmptyList';
import Background from '~/components/Background';

import { formatDate, isDone, prevDay, nextDay } from '~/util/dateUtils';

import { Container, Title, List, DateView } from './styles';

const per_page = 5;

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(() => formatDate(date), [date]);

  async function loadMeetups(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) {
      return;
    }

    const response = await api.get('meetups', {
      params: {
        per_page,
        page: pageNumber,
        date,
      },
    });

    const data = response.data.map(meetup => {
      return {
        ...meetup,
        past: isDone(meetup.past),
      };
    });

    const totalItems = await response.data.count;

    setTotal(Math.ceil(totalItems / per_page));
    setMeetups(shouldRefresh ? data : [...meetups, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadMeetups();
    }
  }, [isFocused, date]);

  async function handleSubmit(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert(
        'Inscrito com sucesso',
        'Sua inscrição foi realizada com sucesso'
      );
    } catch (error) {
      Alert.alert(
        'Ops!',
        'Não é possivel se inscrever em um meetup que já foi realizado'
      );
    }
  }

  function handlePrevDay() {
    setPage(1);
    setDate(prevDay(date));
    setMeetups([]);
  }

  function handleNextDay() {
    setPage(1);
    setDate(nextDay(date));
    setMeetups([]);
  }

  return (
    <Background>
      <Container>
        <Header />
        <DateView>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Title>{dateFormatted}</Title>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateView>

        {loading && <Loading />}

        {!loading &&
          (meetups.length ? (
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  data={item}
                  handleSubmit={() => handleSubmit(item.id)}
                />
              )}
              onRefresh={loadMeetups}
              refreshing={refreshing}
              onEndReached={() => loadMeetups(page + 1)}
              onEndReachedThreshold={0.2}
            />
          ) : (
            <EmptyList>Não há meetups para esta data!</EmptyList>
          ))}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
