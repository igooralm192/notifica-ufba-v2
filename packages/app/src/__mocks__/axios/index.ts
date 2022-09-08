// @ts-ignore
const mockedAxios = jest.genMockFromModule('axios')
// @ts-ignore
mockedAxios.create = jest.fn(() => mockedAxios)

export default mockedAxios
