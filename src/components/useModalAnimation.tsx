import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {closeModal} from '../redux/feature/modalSlice';

const useModalAnimation = (isModalOpen: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const scaleValue = useRef(new Animated.Value(0)).current;

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isModalOpen) {
      Animated.spring(scaleValue, {
        toValue: 1.1,
        delay: 100,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => {
        handleCloseModal();
      }, 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalOpen]);

  return scaleValue;
};

export default useModalAnimation;
