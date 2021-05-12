import { mount, createLocalVue } from '@vue/test-utils'
import RegisterPage from '@/views/RegisterPage'
import VueRouter from 'vue-router'

// vm.$router에 접근할 수 있도록
// 테스트에 Vue Router 추가
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/services/registration')

// npm install @vue/test-utils --save-dev   (뷰 테스트용 유틸)
// npm run test:unit으로 검증
describe('RegisterPage.vue', () => {
    let wrapper
    let fieldUsername
    let fieldEmailAddress
    let fieldPassword
    let buttonSubmit

    beforeEach(() => {
        wrapper = mount(RegisterPage, {
            localVue,
            router
        })
        fieldUsername = wrapper.find('#username')
        fieldEmailAddress = wrapper.find('#emailAddress')
        fieldPassword = wrapper.find('#password')
        buttonSubmit = wrapper.find('form button[type="submit"]')
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    it('should render correct contents', () => {
        expect(wrapper.find('.logo').attributes().src)
            .toEqual('/static/images/logo.png')
        expect(wrapper.find('.tagline').text())
            .toEqual('Open source task management tool')
        expect(fieldUsername.element.value).toEqual('')
        expect(fieldEmailAddress.element.value).toEqual('')
        expect(fieldPassword.element.value).toEqual('')
        expect(buttonSubmit.text()).toEqual('Create account')
    })
    // 데이터 초깃값 검증
    it('should contain data model with initial values', () => {
        expect(wrapper.vm.form.username).toEqual('')
        expect(wrapper.vm.form.emailAddress).toEqual('')
        expect(wrapper.vm.form.password).toEqual('')
    })

    // 바인딩 검증하는 테스트
    it('should have form inputs bound with data model', () => {
        const username = 'sunny'
        const emailAddress = 'sunny@taskagile.com'
        const password = 'VueJsRocks!'

        wrapper.vm.form.username = username
        wrapper.vm.form.emailAddress = emailAddress
        wrapper.vm.form.password = password
        // expect(fieldUsername.element.value).toEqual(username)
        // expect(fieldEmailAddress.element.value).toEqual(emailAddress)
        // expect(fieldPassword.element.value).toEqual(password)
    })

    // 제출 핸들러 존재 여부 확인(제스트 이용)
    it('should have form submit event handler `submitForm`', () => {
        const stub = jest.fn()
        wrapper.setMethods({submitForm: stub})
        buttonSubmit.trigger('submit')
        expect(stub).toBeCalled()
    })

    it('should register when it is a new user', async () => {
        const stub = jest.fn()
        wrapper.vm.$router.push = stub
        wrapper.vm.form.username = 'sunny'
        wrapper.vm.form.emailAddress = 'sunny@taskagile.com'
        wrapper.vm.form.firstName = 'Sunny'
        wrapper.vm.form.lastName = 'Hu'
        wrapper.vm.form.password = 'JestRocks!'
        wrapper.vm.submitForm()
        await wrapper.vm.$nextTick()
        expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
    })
})