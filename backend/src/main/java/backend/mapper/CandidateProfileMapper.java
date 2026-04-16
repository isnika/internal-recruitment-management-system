package backend.mapper;

import backend.DTO.candidateProdile.CandidateProfileResponse;
import backend.DTO.candidateProdile.CreateCandidateProfileRquest;
import backend.entity.CandidateProfile;
import backend.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CandidateProfileMapper {

  public static CandidateProfile toEntity(CreateCandidateProfileRquest request, User user) {
    if (request == null) {
      return null;
    }

    return CandidateProfile.builder()
        .gender(request.getGender())
        .dateOfBirth(request.getDateOfBirth())
        .phone(request.getPhone())
        .address(request.getAddress())
        .socialLink(request.getSocialLink())
        .bankAccountName(request.getBankAccountName())
        .user(user)
        .build();
  }

  public static CandidateProfileResponse toResponse(CandidateProfile profile) {
    if (profile == null) {
      return null;
    }

    return CandidateProfileResponse.builder()
        .id(profile.getId())
        .gender(profile.getGender())
        .dateOfBirth(profile.getDateOfBirth())
        .phone(profile.getPhone())
        .address(profile.getAddress())
        .socialLink(profile.getSocialLink())
        .bankAccountName(profile.getBankAccountName())
        .build();
  }

  public static void updateEntity(CandidateProfile profile, CreateCandidateProfileRquest request) {
    if (profile == null || request == null) {
      return;
    }

    profile.setGender(request.getGender());
    profile.setDateOfBirth(request.getDateOfBirth());
    profile.setPhone(request.getPhone());
    profile.setAddress(request.getAddress());
    profile.setSocialLink(request.getSocialLink());
    profile.setBankAccountName(request.getBankAccountName());
  }
}
