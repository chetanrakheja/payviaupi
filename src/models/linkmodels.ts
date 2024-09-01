import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the LinkData interface
export interface LinkData extends Document {
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
  upi_qr_data?: string;  // This is optional since it's not required
}

// Define the LinkSchema
const LinkSchema: Schema<LinkData> = new mongoose.Schema({
  user_id: { type: String, required: false },
  name: { type: String, required: false },
  amount_list: { type: String, required: false },
  upi_id: { type: String, required: true },
  btn_txt: { type: String, required: false },
  minAmount: { type: String, required: false },
  transactionNote: { type: String, required: false },
  upi_link: { type: String, required: true }, // Short link
  clicks: { type: Number, required: true, default: 0 },
  created_date: { type: Date, default: Date.now },
  upi_qr_data: { type: String, required: false }, // Optional field
});

// // let linksData
// // try {
// //   // Check if the model already exists
// //   linksData = mongoose.models.LinkData as mongoose.Model<LinkData>;
// // } catch (e) {
// //   // If it doesn't exist, define the model
// //   linksData = mongoose.model<LinkData>('linksData', LinkSchema);
// // }

// Check if the model already exists, otherwise define it
const linksData: Model<LinkData> = 
  mongoose.models.linksData || mongoose.model<LinkData>('linksData', LinkSchema);

export default linksData;
