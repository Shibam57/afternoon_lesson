
import { ref, computed } from "vue";

const cartItems = ref([]);


const getAvailableSpaces = (lesson) => {
  const cartItem = cartItems.value.find(
    (item) => item.lesson._id === lesson._id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  return Math.max(0, Number(lesson.space) - quantity);
};


const addToCart = (lesson) => {
  if (getAvailableSpaces(lesson) <= 0) return;

  const existingItem = cartItems.value.find(
    (item) => item.lesson._id === lesson._id
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({
      lesson,
      quantity: 1
    });
  }
};


const removeFromCart = (lessonId) => {
  const index = cartItems.value.findIndex(
    (item) => item.lesson._id === lessonId
  );

  if (index === -1) return;

  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
  } else {
    cartItems.value.splice(index, 1);
  }
};


const clearCart = () => {
  cartItems.value = [];
};


const cartCount = computed(() =>
  cartItems.value.reduce(
    (total, item) => total + item.quantity,
    0
  )
);


const cartTotal = computed(() =>
  cartItems.value.reduce(
    (total, item) =>
      total + Number(item.lesson.price) * item.quantity,
    0
  )
);

export function useCart() {
  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    getAvailableSpaces,
    clearCart
  };
}
