import { MissionUtils } from '@woowacourse/mission-utils'
import { MESSAGE } from './constants/message.js'
import validate from './utils/validate.js'

class LottoGame {
	#lottoAmount //로또 개수

	#lottoRandomNumberArr = [] //로또 랜덤값 배열 (이중 배열)

	#winnerNumberArr //당첨 번호 배열

	#bonusNumber //보너스 번호
	async start() {
		await this.inputMoneyAndLottoAmount()
		this.randomNumberArr()
		await this.inputWinnerNumber()
		await this.inputBonus()
		this.getResultLotto()
		this.printResultLotto()
	}

	//돈 입력 및 로또 구매 수 출력
	async inputMoneyAndLottoAmount() {
		const userInputPrice = await MissionUtils.Console.readLineAsync(
			MESSAGE.INPUT.PRICE_NUMBER,
		)
		const Validate = new validate()
		Validate.inputMoney(userInputPrice)
		this.#lottoAmount = userInputPrice / 1000
		MissionUtils.Console.print(`\n${this.#lottoAmount}개를 구매했습니다.`)
	}

	//랜덤한 값 배열로
	randomNumberArr() {
		for (let i = 0; i < this.#lottoAmount; i++) {
			const randomNum = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)
			randomNum.sort((a, b) => a - b)
			this.#lottoRandomNumberArr.push(randomNum)
			MissionUtils.Console.print(randomNum)
		}
		const Validate = new validate()
		Validate.randomLottoArr(this.#lottoRandomNumberArr)
	}

	//로또 번호 입력
	async inputWinnerNumber() {
		const userInputWinnerNumber = await MissionUtils.Console.readLineAsync(
			MESSAGE.INPUT.WINNER_NUMBER,
		)
		this.#winnerNumberArr = userInputWinnerNumber.split(',')

		const Validate = new validate()
		Validate.inputWinner(this.#winnerNumberArr)
	}

	//보너스 번호 입력
	async inputBonus() {
		this.#bonusNumber = await MissionUtils.Console.readLineAsync(
			MESSAGE.INPUT.BONUS_NUMBER,
		)

		const Validate = new validate()
		Validate.inputBonus(this.#bonusNumber)
	}

	//결과
	getResultLotto() {
		for (let random of this.#lottoRandomNumberArr) {
			let count = random.filter(it =>
				this.#winnerNumberArr.includes(String(it)),
			).length
			if (count === 5 && random.includes(Number(this.#bonusNumber))) {
				this.#resultLottoArr.push('5B')
			}
			if (count >= 3 && count <= 6 && count !== 5) {
				this.#resultLottoArr.push(String(count))
			}
		}
	}

	//결과 출력

	printResultLotto() {
		MissionUtils.Console.print('\n당첨 통계\n---')
		MissionUtils.Console.print(`3개 일치(5,000) - ${this.matchCount('3')}개`)
		MissionUtils.Console.print(`4개 일치(50,000) - ${this.matchCount('4')}개`)
		MissionUtils.Console.print(
			`5개 일치(1.500,000) - ${this.matchCount('5')}개`,
		)
		MissionUtils.Console.print(
			`5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.matchCount('5B')}개`,
		)
		MissionUtils.Console.print(
			`6개 일치 (2,000,000,000원) - ${this.matchCount('6')}개`,
		)
	}
	}
	}
}
export default LottoGame
