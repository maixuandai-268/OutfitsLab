/* eslint-disable prettier/prettier */
export class ApproveSellerDto {
  sellerId: string; 
  status: 'approved' | 'rejected'; 
  reason?: string; 
}

export class UpdateUserStatusDto {
  userId: string; 
  is_active: boolean; 
}