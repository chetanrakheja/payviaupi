import mongoose, { Schema, Document } from 'mongoose';

// let link_Schema = new mongoose.Schema({
//   // user_id: {type: String,required: false},
//     name: {type: String, required: false},
//     amount_list: {type: String, required: false},
//     upi_id: {type: String, required: true},
//     btn_txt: {type: String, required: false},
//     minAmount: {type: String, required: false},
//     transactionNote: {type: String, required: false},
//     upi_link: {type: String, required: true}, // Short link
//     clicks: {type: Number, required: true, default: 0},
//     date: {type: String, default: Date.now},
//     // upi_qr_data: {type: String, required: false}
// });

export interface LinkData extends Document {
    content: string;
    createdAt: Date;
      user_id: string;
      name: string;
      amount_list: string;
      upi_id: string;
      btn_txt: string;
      minAmount: string;
      transactionNote: string;
      upi_link: string;
      clicks: number;
      created_date: Date;
      upi_qr_data: string;
  }
  
  const LinkSchema: Schema<LinkData> = new mongoose.Schema({
    user_id: {type: String,required: false},
      name: {type: String, required: false},
      amount_list: {type: String, required: false},
      upi_id: {type: String, required: true},
      btn_txt: {type: String, required: false},
      minAmount: {type: String, required: false},
      transactionNote: {type: String, required: false},
      upi_link: {type: String, required: true}, // Short link
      clicks: {type: Number, required: true, default: 0},
      created_date: {type: Date, default: Date.now},
      // upi_qr_data: {type: String, required: false}
  });


// try {
//   // Check if the model already exists
//   linksData = mongoose.model('linksData');
// } catch (e) {
//   // If it doesn't exist, define the model
//   linksData = mongoose.model('linksData', LinkSchema);
// }


const linksData =
  (mongoose.models.LinkData as mongoose.Model<LinkData>) ||
  mongoose.model<LinkData>('linksData', LinkSchema);

export default linksData;