import {
  Company,
  CompaniesRepositoryI,
  CompaniesServiceI,
  UpsertCompanyProfileDTO,
} from '../core/company';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';

@injectable()
export class CompaniesService implements CompaniesServiceI {
  private _repository: CompaniesRepositoryI;

  public constructor(
    @inject(TYPES.CompaniesRepository) repository: CompaniesRepositoryI,
  ) {
    this._repository = repository;
  }

  createSupplier(userId: string, name: string): void {
    throw new Error('Method not implemented.');
  }

  createIssuer(name: string): void {
    console.log(name + 'was creared');
  }

  list(): Promise<Company[] | undefined> {
    return this._repository.list();
  }

  findById(userId: string, id: string): Promise<Company | undefined> {
    return this._repository.findOne(id);
  }

  update(userId: string, data: UpsertCompanyProfileDTO): Promise<Company> {
    return new Promise<Company>(async resolve => {
      const profile = (await this._repository.findOne(userId)) || new Company();
      const updatedProfile = {
        ...profile,
        id: userId,
        name: data.name,
        orgType: data.orgType,
        industry: data.industry,
        founder: data.founder,
        headquaters: data.headquaters,
        numberOfEmployees: data.numberOfEmployees,
        product: data.product,
        revenue: data.revenue,
        website: data.website,
      };

      const result = await this._repository.upsert(updatedProfile);
      console.log(result)
      resolve(result);
    });
  }
}
