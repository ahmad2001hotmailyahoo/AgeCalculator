var year = document.getElementById("input-year")
var month = document.getElementById("input-month")
var day = document.getElementById("input-day")

year.addEventListener("input", ageExtractor)
month.addEventListener("input", ageExtractor)
day.addEventListener("input", ageExtractor)

var dateObject = {
  year: "",
  month: "",
  day: "",
}

function isNumeric(value) {
  return value.match(/^[0-9]+$/)
}

function setError(errorOf, errorMessage) {
  document.getElementById(`${errorOf}`).textContent = `${errorMessage}`
	if(document.getElementById('error-year').textContent == ''){
		document.getElementById("year-label").style.color = "black"
		year.style.borderColor = "black"
		year.style.outlineColor = "black"
	}
	else {
		document.getElementById("year-label").style.color = "red"
		year.style.borderColor = "red"
		year.style.outlineColor = "red"
	}
	if(document.getElementById('error-month').textContent == ''){
		document.getElementById("month-label").style.color = "black"
		month.style.borderColor = "black"
		month.style.outlineColor = "red"
	}
	else {
		document.getElementById("month-label").style.color = "red"
		month.style.borderColor = "red"
		month.style.outlineColor = "red"
	}
	if(document.getElementById('error-day').textContent == ''){
		document.getElementById("date-label").style.color = "black"
		day.style.borderColor = "black"
		day.style.outlineColor = "black"
	}
	else {
		document.getElementById("date-label").style.color = "red"
		day.style.borderColor = "red"
		year.style.outlineColor = "red"
	}
}

function isLeapyear(year) {
  if (year % 400 == 0) return true
  else if (year % 100 == 0) return false
  else if (year % 4 == 0) return true
}

function setDate(day ,month ,year) {
	document.getElementById("year-number").textContent = `${year}`
	document.getElementById("month-number").textContent = `${month}`
	document.getElementById("day-number").textContent = `${day}`
}

function getMonthDay(year, month) {
  if (month == 1) return 31
  else if (month == 2 && isLeapyear(year)) return 29
  else if (month == 2) return 28
  else if (month == 3) return 31
  else if (month == 4) return 30
  else if (month == 5) return 31
  else if (month == 6) return 30
  else if (month == 7) return 31
  else if (month == 8) return 31
  else if (month == 9) return 30
  else if (month == 10) return 31
  else if (month == 11) return 30
  else if (month == 12) return 31
}

function getAge(
  birth_day,
  birth_month,
  birth_year,
  today_date,
  today_month,
  today_year
) {
  let isError = true
  if (!(birth_year >= 1970 && birth_year <= 2100)) {
    setError("error-year", "Enter valid year")
    isError = false
		setDate("--","--","--",year)
  }
  if (!(birth_month >= 1 && birth_month <= 12)) {
    setError("error-month", "Enter valid month")
    isError = false
		setDate("--" ,"--" ,"--")
  }
  if (getMonthDay(birth_month) < birth_day) {
    setError("error-day", "Enter valid month")
    isError = false
		setDate("--" ,"--","--")
  }
  if (isError) {
    let year = today_year - birth_year
    let month = today_month - birth_month
    let day = today_date - birth_day
    if (month < 0) {
      year = year - 1
      month = 12 + month
    }
    if (day < 0) {
      month = month - 1
      if (month < 0) {
        year -= 1
        month = 12 + month
      }
        day = day + getMonthDay(year, birth_month)

    }
		setDate(day ,month ,year)
    setError("error-year", "")
		setError("error-month", "")
		setError("error-day", "")
  }
}

function ageExtractor(e) {
  const today = new Date()
  dateObject = {
    ...dateObject,
    [e.target.name]: e.target.value,
  }
  if (
    isNumeric(dateObject["day"]) &&
    isNumeric(dateObject["month"]) &&
    isNumeric(dateObject["year"])
  ) {
    getAge(
      dateObject["day"],
      dateObject["month"],
      dateObject["year"],
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear()
    )
  } else {
		if (dateObject["day"] == '') setError("error-day", "This field must not be empty")
		else setError("error-day", "")
		if (dateObject["month"] == '') setError("error-month", "This field must not be empty")
		else setError("error-month", "")
		if (dateObject["year"] == '') setError("error-year", "This field must not be empty")
		else setError("error-year", "")
		if (!isNumeric(dateObject["day"])) setError("error-day", "Enter valid day")
		if (!isNumeric(dateObject["month"])) setError("error-month", "Enter valid month")
		if (!isNumeric(dateObject["year"] )) setError("error-year", "Enter valid year")
  }
}
