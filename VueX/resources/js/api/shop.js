const _products = [
    { 'id': 1, 'name': 'iPad 4 Mini','img':'hinh11233', 'price': 500.01, 'quantity': 2,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 2, 'name': 'H&M T-Shirt White','img':'hinh11233', 'price': 10.99, 'quantity': 10,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 3, 'name': 'Hoa hồng','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 4, 'name': 'Điện thoại','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 5, 'name': 'Khăn giấy','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 6, 'name': 'Hộp ướct','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 7, 'name': 'Đĩa vàng','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 8, 'name': 'Laptop ngon ','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 9, 'name': 'Màn hình máy tính','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
    { 'id': 10, 'name': 'Tủ lạnh','img':'hinh11233', 'price': 19.99, 'quantity': 5,'descreption':'sinsdanknklsf sldjfkdjas' },
]

export default {
    getProducts (cb) {
        setTimeout(() => cb(_products), 100)
    },

    buyProducts (products, cb, errorCb) {
        setTimeout(() => {
            // simulate random checkout failure.
            (Math.random() > 0.5 || navigator.webdriver)
                ? cb()
                : errorCb()
        }, 100)
    }
}
