import { Test, TestingModule } from '@nestjs/testing';
import { Provider } from '@nestjs/common';
import { ChannelService } from '@/core/channel/channel.service';
import { ChannelRepository } from '@/core/channel/channel.repository';
import { CreateChannelDto } from '@/core/channel/dto/create-channel.dto';
import { Channel } from '@prisma/client';

describe('ChannelService', () => {
  let service: ChannelService;
  let repo: jest.Mocked<ChannelRepository>;

  const dummyChannel: Channel = {
    id: '1',
    name: 'Channel1',
    slug: 'test',
    description: 'test',
    currencyCode: 'USD',
    languageCode: 'EN',
    countryCode: 'US',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    accentTextColor: '',
    accentButtonColor: '',
    accentGradientFrom: '',
    accentGradientTo: '',
    domainId: '',
  };
  const dummyChannels = [dummyChannel];

  beforeEach(async () => {
    const ChannelRepositoryProvider: Provider = {
      provide: ChannelRepository,
      useClass: jest.fn(() => ({
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
      })),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [ChannelService, ChannelRepositoryProvider],
    }).compile();

    service = moduleRef.get(ChannelService);
    repo = moduleRef.get(ChannelRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllChannels', () => {
    it('should return all channels', async () => {
      repo.findAll.mockResolvedValue(dummyChannels);

      const result = await service.findAllChannels();

      expect(result).toEqual(dummyChannels);
    });

    it('should return empty array if no channels are found', async () => {
      repo.findAll.mockResolvedValue([]);

      const result = await service.findAllChannels();

      expect(result).toEqual([]);
    });
  });

  describe('findChannelById', () => {
    it('should return null if no Channel is found', async () => {
      repo.findById.mockResolvedValue(null);
      const result = await service.findChannelById('test-id');
      expect(result).toBeNull();
    });

    it('should return a Channel if found', async () => {
      const mockChannel = {
        id: 'test-id',
        slug: 'test-slug',
        name: 'test-name',
        description: 'test-description',
        currencyCode: 'test-currencyCode',
        languageCode: 'test-languageCode',
        countryCode: 'test-countryCode',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        domainId: 'test-domainId',
        accentTextColor: 'test-accentTextColor',
        accentButtonColor: 'test-accentButtonColor',
        accentGradientFrom: 'test-accentGradientFrom',
        accentGradientTo: 'test-accentGradientTo',
        menus: [],
      };

      repo.findById.mockResolvedValue(mockChannel);
      const result = await service.findChannelById('test-id');
      expect(result).toEqual(mockChannel);
    });
  });

  describe('createChannel', () => {
    it('should create a new channel', async () => {
      const dto: CreateChannelDto = {
        slug: 'test-channel',
        name: 'Test Channel',
        description: 'This is a test channel',
        currencyCode: 'USD',
        languageCode: 'en',
        countryCode: 'US',
      };

      repo.create.mockResolvedValueOnce(dto as any);
      const result = await service.createChannel(dto);
      expect(result).toMatchObject(dto);
    });
  });
});
