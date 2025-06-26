import type { Schema, Struct } from '@strapi/strapi';

export interface CtaCta extends Struct.ComponentSchema {
  collectionName: 'components_cta_ctas';
  info: {
    displayName: 'cta';
    icon: 'paperPlane';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    size: Schema.Attribute.Enumeration<
      ['small', 'medium', 'large', 'extra large']
    >;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'other']>;
  };
}

export interface EducationEducationComponent extends Struct.ComponentSchema {
  collectionName: 'components_education_education_components';
  info: {
    displayName: 'Education Component';
    icon: 'feather';
  };
  attributes: {
    degree: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Blocks;
    endDate: Schema.Attribute.Date;
    fieldOfStudy: Schema.Attribute.String;
    institution: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    startDate: Schema.Attribute.Date;
  };
}

export interface ExperienceExperienceComponent extends Struct.ComponentSchema {
  collectionName: 'components_experience_experience_components';
  info: {
    displayName: 'Experience Component';
    icon: 'briefcase';
  };
  attributes: {
    company: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    current: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date & Schema.Attribute.Required;
    location: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
  };
}

export interface ProjectDetailProjectDetails extends Struct.ComponentSchema {
  collectionName: 'components_project_detail_project_details';
  info: {
    displayName: 'Project Details';
    icon: 'envelop';
  };
  attributes: {
    challenge: Schema.Attribute.Blocks;
    features: Schema.Attribute.Blocks & Schema.Attribute.Required;
    projectTimeline: Schema.Attribute.Blocks;
    solution: Schema.Attribute.Boolean;
    teamSize: Schema.Attribute.Integer & Schema.Attribute.Required;
    technicalDetails: Schema.Attribute.Blocks;
  };
}

export interface SkillsSkillsComponent extends Struct.ComponentSchema {
  collectionName: 'components_skills_skills_components';
  info: {
    displayName: 'Skills Component';
    icon: 'briefcase';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['Frontend', 'Backend', 'Tools', 'Soft']
    > &
      Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    proficiency: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

export interface SocialLinkSocialLinkComponent extends Struct.ComponentSchema {
  collectionName: 'components_social_link_social_link_components';
  info: {
    displayName: 'Social Link Component';
    icon: 'globe';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface TechnologyTechnologyComponent extends Struct.ComponentSchema {
  collectionName: 'components_technology_technology_components';
  info: {
    displayName: 'Technology Component';
    icon: 'connector';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cta.cta': CtaCta;
      'education.education-component': EducationEducationComponent;
      'experience.experience-component': ExperienceExperienceComponent;
      'project-detail.project-details': ProjectDetailProjectDetails;
      'skills.skills-component': SkillsSkillsComponent;
      'social-link.social-link-component': SocialLinkSocialLinkComponent;
      'technology.technology-component': TechnologyTechnologyComponent;
    }
  }
}
