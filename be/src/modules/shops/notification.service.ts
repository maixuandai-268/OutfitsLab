import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  // Tạo notification mới
  async create(
    userId: number,
    title: string,
    desc: string,
  ): Promise<Notification> {
    const notification = this.notificationRepo.create({
      userId,
      title,
      desc,
      isRead: false,
    });
    return this.notificationRepo.save(notification);
  }

  // Lấy tất cả notification của 1 user, mới nhất lên đầu
  async findAllByUser(userId: number): Promise<Notification[]> {
    return this.notificationRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // Đánh dấu 1 notification đã đọc
  async markAsRead(id: number, userId: number): Promise<void> {
    await this.notificationRepo.update({ id, userId }, { isRead: true });
  }

  // Đánh dấu tất cả đã đọc
  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationRepo.update(
      { userId, isRead: false },
      { isRead: true },
    );
  }
}
