import doctorModel from "../models/doctorModel.js"


const changeAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body
        const doctorData = await doctorModel.findById(doctorId)
        await doctorModel.findByIdAndUpdate(doctorId, { available: !doctorData.available })
        res.json({ success: true, message: 'Doctor availability updated' })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctorsData = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctorsData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

export { changeAvailability, doctorList }